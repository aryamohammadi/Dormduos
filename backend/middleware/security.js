// Basic security middleware for the app

// Simple CORS setup
const createCorsMiddleware = () => {
  return (req, res, next) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local development
      'http://localhost:3000', 
      'https://dormduos.com',  // Production
      'https://www.dormduos.com'
    ];
    
    const origin = req.headers.origin;
    
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      console.log('CORS blocked origin:', origin);
      return res.status(403).json({ 
        error: 'Origin not allowed'
      });
    }
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  };
};

// Basic security headers
const securityHeaders = (req, res, next) => {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Remove Express fingerprinting
  res.removeHeader('X-Powered-By');
  
  next();
};

module.exports = {
  createCorsMiddleware,
  securityHeaders
}; 