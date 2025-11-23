const jwt = require('jsonwebtoken');
const Landlord = require('../models/Landlord');

const authenticateToken = async (req, res, next) => {
  try {
    console.log('Auth middleware called for:', req.method, req.path);
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    console.log('Authorization header present:', !!authHeader);
    console.log('Authorization header value:', authHeader ? `${authHeader.substring(0, 30)}...` : 'none');
    
    if (!authHeader) {
      console.error('No Authorization header found');
      console.error('Request headers:', Object.keys(req.headers));
      return res.status(401).json({ 
        error: 'Access denied. No token provided.',
        debug: 'No Authorization header in request'
      });
    }
    
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    console.log('Token extracted:', token ? `Token exists (${token.length} chars)` : 'NO TOKEN');
    console.log('Token preview:', token ? `${token.substring(0, 20)}...${token.substring(token.length - 10)}` : 'none');
    
    if (!token) {
      console.error('Token extraction failed');
      console.error('Auth header format:', authHeader);
      return res.status(401).json({ 
        error: 'Access denied. No token provided.',
        debug: 'Token not found in Authorization header. Expected format: "Bearer <token>"'
      });
    }
    
    // Check JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    console.log('JWT_SECRET present:', !!jwtSecret);
    console.log('JWT_SECRET length:', jwtSecret ? jwtSecret.length : 0);
    
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return res.status(500).json({ 
        error: 'Server configuration error.',
        debug: 'JWT_SECRET not set in environment variables'
      });
    }
    
    // Verify token
    console.log('Verifying token...');
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
      console.log('Token verified successfully');
      console.log('Decoded token:', { landlordId: decoded.landlordId, iat: decoded.iat, exp: decoded.exp });
    } catch (verifyError) {
      console.error('Token verification failed');
      console.error('Error name:', verifyError.name);
      console.error('Error message:', verifyError.message);
      console.error('Token used:', `${token.substring(0, 20)}...`);
      
      if (verifyError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          error: 'Invalid token.',
          debug: `JWT Error: ${verifyError.message}`,
          tokenPreview: `${token.substring(0, 20)}...`
        });
      }
      if (verifyError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: 'Token expired.',
          debug: `Token expired at: ${new Date(verifyError.expiredAt).toISOString()}`
        });
      }
      throw verifyError;
    }
    
    // Get landlord from database
    console.log('Looking up landlord:', decoded.landlordId);
    const landlord = await Landlord.findById(decoded.landlordId);
    
    if (!landlord) {
      console.error('Landlord not found in database:', decoded.landlordId);
      return res.status(401).json({ 
        error: 'Invalid token or account deactivated.',
        debug: `Landlord with ID ${decoded.landlordId} not found in database`
      });
    }
    
    if (!landlord.isActive) {
      console.error('Landlord account is deactivated:', decoded.landlordId);
      return res.status(401).json({ 
        error: 'Invalid token or account deactivated.',
        debug: 'Account has been deactivated'
      });
    }
    
    console.log('Authentication successful for landlord:', landlord.email);
    
    // Add landlord to request object
    req.landlord = landlord;
    next();
    
  } catch (error) {
    console.error('Auth middleware unexpected error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Authentication error.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { authenticateToken }; 