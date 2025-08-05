const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // EMERGENCY PRODUCTION HARDCODE: Railway isn't reading environment variables
    let mongoURI;
    
    if (process.env.NODE_ENV === 'production') {
      // HARDCODED for production Railway deployment
      mongoURI = 'mongodb://mongo:HenGsHmsxgReveohpTWSTLvVSzpADZYX@mongodb-production-c5d1.up.railway.app:27017/ucrhousing';
      console.log('🚑 Using hardcoded production MongoDB URI');
    } else {
      // Use environment variable or fallback for non-production
      mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucrhousing-dev';
    }
    
    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI not set in production');
      
      // Don't crash - try to connect to local MongoDB as fallback
      if (process.env.NODE_ENV === 'production') {
        console.error('❌ MONGODB_URI is required for production. Please set it in Railway.');
        // Use a safe fallback that won't crash the app
        mongoURI = 'mongodb://localhost:27017/ucrhousing-fallback';
      } else {
        mongoURI = 'mongodb://localhost:27017/ucrhousing-dev';
      }
    }
    
    // If using Railway's internal URL and it fails, try the public URL
    if (mongoURI && mongoURI.includes('mongodb.railway.internal')) {
      const publicMongoURI = mongoURI.replace('mongodb.railway.internal', 'mongodb-production-c5d1.up.railway.app');
      console.log('Trying Railway public MongoDB URL...');
      mongoURI = publicMongoURI;
    }
    
    const dbName = mongoURI.includes('localhost') ? 'localhost' : 'cloud';
    console.log(`Connecting to MongoDB... ${dbName}`);
    
    const conn = await mongoose.connect(mongoURI, {
      // Connection options for Railway and better reliability
      serverSelectionTimeoutMS: 10000, // Increased timeout for Railway
      maxPoolSize: 5 // Reduced pool size for Railway
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // PRODUCTION SAFE: Don't crash the entire app
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  Production: MongoDB connection failed, but keeping app running');
      return; // Don't exit in production
    }
    
    // In development, exit on DB connection failure
    console.error('Exiting due to database connection failure...');
    process.exit(1);
  }
};

module.exports = connectDB; 