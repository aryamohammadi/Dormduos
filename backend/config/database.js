const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('MONGODB_URI environment variable is not set');
      return;
    }
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      // Basic connection options
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 5
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    
    // Exit in development, continue in production
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      console.log('App continuing without database...');
    }
  }
};

module.exports = connectDB; 