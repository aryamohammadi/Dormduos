const jwt = require('jsonwebtoken');
const Landlord = require('../models/Landlord');

const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get landlord from database
    const landlord = await Landlord.findById(decoded.landlordId);
    if (!landlord || !landlord.isActive) {
      return res.status(401).json({ 
        error: 'Invalid token or account deactivated.' 
      });
    }
    
    // Add landlord to request object
    req.landlord = landlord;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error.' });
  }
};

module.exports = { authenticateToken }; 