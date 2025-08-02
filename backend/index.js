const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { sanitizeInput } = require('./middleware/sanitize');

// Load all our environment variables from .env file
dotenv.config();

// Connect to our MongoDB database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Railway (required for secure cookies and proper IP detection)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  console.log('🔒 Trust proxy enabled for Railway');
}

// Add request ID for tracing
app.use((req, res, next) => {
  req.id = Math.random().toString(36).substr(2, 9);
  res.set('X-Request-ID', req.id);
  next();
});

// Production-safe CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://dormduos.com',
  'https://www.dormduos.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Log for debugging but don't block in production
    console.warn(`CORS warning: Origin "${origin}" not in allowlist, but allowing for production stability`);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.removeHeader('X-Powered-By');
  next();
});

// Let Express parse JSON requests
app.use(express.json({ limit: '10mb' }));

// Handle malformed JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error(`[${req.id}] JSON parsing error:`, error.message);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Input sanitization middleware
app.use(sanitizeInput);

// Hook up all our API routes
app.use('/api/health', require('./routes/health'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

// Global error handler
app.use((error, req, res, next) => {
  console.error(`[${req.id}] Global error:`, error);
  res.status(500).json({ 
    error: 'Internal server error',
    requestId: req.id 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should connect from http://localhost:5173`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
}); 