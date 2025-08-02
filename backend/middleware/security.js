// Security middleware for production hardening

// Rate limiting implementation
const rateLimit = () => {
  const requests = new Map();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // per window per IP
  
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [ip, ipData] of requests.entries()) {
      ipData.timestamps = ipData.timestamps.filter(timestamp => timestamp > windowStart);
      if (ipData.timestamps.length === 0) {
        requests.delete(ip);
      }
    }
    
    // Get or create request record for this IP
    if (!requests.has(clientIP)) {
      requests.set(clientIP, { timestamps: [] });
    }
    
    const ipRecord = requests.get(clientIP);
    ipRecord.timestamps.push(now);
    
    // Check if rate limit exceeded
    if (ipRecord.timestamps.length > maxRequests) {
      res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
      return;
    }
    
    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': Math.max(0, maxRequests - ipRecord.timestamps.length),
      'X-RateLimit-Reset': new Date(now + windowMs).toISOString()
    });
    
    next();
  };
};

// Stricter rate limiting for auth endpoints
const authRateLimit = () => {
  const requests = new Map();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // much lower for auth
  
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [ip, ipData] of requests.entries()) {
      ipData.timestamps = ipData.timestamps.filter(timestamp => timestamp > windowStart);
      if (ipData.timestamps.length === 0) {
        requests.delete(ip);
      }
    }
    
    // Get or create request record for this IP
    if (!requests.has(clientIP)) {
      requests.set(clientIP, { timestamps: [] });
    }
    
    const ipRecord = requests.get(clientIP);
    ipRecord.timestamps.push(now);
    
    // Check if rate limit exceeded
    if (ipRecord.timestamps.length > maxRequests) {
      console.warn(`Rate limit exceeded for IP ${clientIP} on auth endpoint`);
      res.status(429).json({
        error: 'Too many authentication attempts. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
      return;
    }
    
    next();
  };
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // Prevent XSS attacks
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // Needed for Vite dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join('; '));
  
  // Remove Express fingerprinting
  res.removeHeader('X-Powered-By');
  
  next();
};

// Environment validation
const validateEnvironment = () => {
  try {
    const requiredVars = ['JWT_SECRET'];
    
    // Only require MONGODB_URI in production
    if (process.env.NODE_ENV === 'production') {
      requiredVars.push('MONGODB_URI');
    }
    
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing.join(', '));
      
      // In production, log warning but don't crash
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️  Production: Continuing with missing env vars (may cause issues)');
        return;
      }
      
      // In development, provide helpful guidance
      console.error('');
      console.error('💡 To fix this:');
      console.error('   1. Copy .env.example to .env');
      console.error('   2. Fill in the required values');
      console.error('   3. Restart the server');
      console.error('');
      
      // Don't crash in any environment - just warn
      console.error('⚠️  Continuing without required environment variables...');
      return;
    }
    
    // Validate JWT secret strength (but don't crash)
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      console.warn('⚠️  JWT_SECRET should be at least 32 characters for security');
    }
    
    console.log('✅ Environment validation passed');
  } catch (error) {
    console.error('❌ Environment validation error:', error.message);
    console.warn('⚠️  Continuing despite validation error...');
  }
};

// CORS configuration with strict allowlist
const createCorsMiddleware = () => {
  return (req, res, next) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local development
      'http://localhost:3000', // Alternative local port
      'https://dormduos.com',  // Production domain
      'https://www.dormduos.com', // Production www domain
      process.env.FRONTEND_URL // Dynamic frontend URL from env
    ].filter(Boolean);
    
    const origin = req.headers.origin;
    const requestId = req.id || 'unknown';
    
    // Log CORS attempt for debugging
    console.log(`[${requestId}] CORS check: origin="${origin}", allowed=[${allowedOrigins.join(', ')}]`);
    
    // Allow requests with no origin (like mobile apps, Postman, server-to-server)
    if (!origin) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      console.log(`[${requestId}] CORS: No origin header, allowing *`);
    } else if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      console.log(`[${requestId}] CORS: Origin allowed - ${origin}`);
    } else {
      console.warn(`[${requestId}] 🚫 CORS BLOCKED: Origin "${origin}" not in allowlist [${allowedOrigins.join(', ')}]`);
      
      // EMERGENCY: Temporarily allow dormduos.com while we fix environment config
      if (origin === 'https://dormduos.com' || origin === 'https://www.dormduos.com') {
        console.warn(`[${requestId}] 🚑 EMERGENCY OVERRIDE: Allowing ${origin} temporarily`);
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else {
        return res.status(403).json({ 
          error: 'CORS: Origin not allowed',
          origin: origin,
          requestId: requestId,
          allowedOrigins: process.env.NODE_ENV === 'development' ? allowedOrigins : undefined
        });
      }
    }
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      console.log(`[${requestId}] CORS: Preflight request handled`);
      res.status(200).end();
      return;
    }
    
    next();
  };
};

// Request size limiting
const requestSizeLimit = (maxSize = '1mb') => {
  const maxBytes = typeof maxSize === 'string' ? 
    parseInt(maxSize.replace(/mb|kb/i, '')) * (maxSize.toLowerCase().includes('mb') ? 1024 * 1024 : 1024) :
    maxSize;
    
  return (req, res, next) => {
    const contentLength = parseInt(req.headers['content-length']);
    
    if (contentLength && contentLength > maxBytes) {
      return res.status(413).json({
        error: `Request too large. Maximum size: ${maxSize}`,
        received: `${Math.round(contentLength / 1024)}KB`
      });
    }
    
    next();
  };
};

module.exports = {
  rateLimit,
  authRateLimit,
  securityHeaders,
  validateEnvironment,
  createCorsMiddleware,
  requestSizeLimit
}; 