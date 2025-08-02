const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simple, production-safe database connection
    let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucrhousing';
    
    // For development, use local database to prevent production contamination
    if (!process.env.MONGODB_URI && process.env.NODE_ENV !== 'production') {
      mongoURI = 'mongodb://localhost:27017/ucrhousing-dev';
    }
    
    // If using Railway's internal URL and it fails, try the public URL
    if (mongoURI && mongoURI.includes('mongodb.railway.internal')) {
      const publicMongoURI = mongoURI.replace('mongodb.railway.internal', 'mongodb-production-c5d1.up.railway.app');
      console.log('Trying Railway public MongoDB URL...');
      mongoURI = publicMongoURI;
    }
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not configured');
    }
    
    const dbType = mongoURI.includes('localhost') ? 'localhost' : 'cloud';
    console.log(`Connecting to MongoDB... ${dbType}`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Listen for connection issues
    mongoose.connection.on('error', (err) => {
      console.error('⚠️  MongoDB connection error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // In production, try to continue (graceful degradation)
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Production: Continuing without database connection...');
      return null;
    }
    
    // In development, continue but log the error
    console.log('🔄 Development: Continuing without database...');
  }
};

module.exports = connectDB; 