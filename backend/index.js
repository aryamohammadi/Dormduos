const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const corsOptions = require('./config/cors');
const { sanitizeInput } = require('./middleware/sanitize');
const { 
  rateLimit, 
  authRateLimit, 
  securityHeaders, 
  validateEnvironment,
  createCorsMiddleware,
  requestSizeLimit 
} = require('./middleware/security');

// Load all our environment variables from .env file
dotenv.config();

// Validate environment variables (fail fast if required vars missing)
validateEnvironment();

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

// Production security hardening
app.use(securityHeaders);
app.use(requestSizeLimit('10mb'));
app.use(rateLimit());

// Setup CORS with strict allowlist
app.use(createCorsMiddleware());

// Let Express parse JSON requests (with a reasonable size limit)
app.use(express.json({
  limit: '10mb'
}));

// Handle when someone sends us malformed JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error(`[${req.id}] JSON parsing error:`, error.message);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Input sanitization middleware to prevent NoSQL injection
app.use(sanitizeInput);

// Hook up all our API routes with appropriate security
app.use('/api/health', require('./routes/health'));
app.use('/api/auth', authRateLimit(), require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

// Catch any errors that slip through
app.use((error, req, res, next) => {
  console.error(`[${req.id}] Global error:`, error);
  res.status(500).json({ 
    error: 'Internal server error',
    requestId: req.id 
  });
});

// Actually start the server
app.listen(PORT, () => {
  const environment = process.env.NODE_ENV || 'development';
  const databaseType = process.env.MONGODB_URI ? 'Railway' : 'localhost';
  
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📱 Frontend should connect from http://localhost:5173');
  console.log('🌍 Environment:', environment);
  console.log('💾 Database:', databaseType);
  console.log('🔗 FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT SET');
}); 