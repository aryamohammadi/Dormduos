const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use local MongoDB for dev, Atlas for production
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucrhousing';
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Listen for connection issues
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Don't crash the server in development - just log it
    // process.exit(1);
  }
};

module.exports = connectDB; 