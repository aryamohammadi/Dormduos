const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const corsOptions = require('./config/cors');
const { sanitizeInput } = require('./middleware/sanitize');

// Load all our environment variables from .env file
dotenv.config();

// Connect to our MongoDB database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup CORS so frontend can talk to us
app.use(cors(corsOptions));

// Let Express parse JSON requests (with a reasonable size limit)
app.use(express.json({
  limit: '10mb'
}));

// Handle when someone sends us malformed JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Input sanitization middleware to prevent NoSQL injection
app.use(sanitizeInput);

// Simple health check - just tells us if the server is alive
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'UCR Housing API is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Check if our database connection is working (useful for debugging)
app.get('/api/db-test', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const connectionState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    res.json({
      message: 'Database connection test',
      connectionState: states[connectionState],
      databaseName: mongoose.connection.name || 'not connected',
      host: mongoose.connection.host || 'not connected'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hook up all our API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

// Catch any errors that slip through
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Actually start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend should connect from http://localhost:5173`);
}); 