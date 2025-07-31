const mongoose = require('mongoose');
const { getConfig } = require('./environments');

const connectDB = async () => {
  try {
    const envConfig = getConfig();
    const mongoURI = envConfig.mongodb;
    
    // Safety check: prevent development from accidentally hitting production
    if (envConfig.isDevelopment && mongoURI.includes('mongodb.net')) {
      throw new Error('🚨 SAFETY: Development environment cannot connect to cloud MongoDB. Use local MongoDB instead.');
    }
    
    // If using Railway's internal URL and it fails, try the public URL (production only)
    let finalMongoURI = mongoURI;
    if (mongoURI && mongoURI.includes('mongodb.railway.internal')) {
      const publicMongoURI = mongoURI.replace('mongodb.railway.internal', 'mongodb-production-c5d1.up.railway.app');
      console.log('Trying Railway public MongoDB URL...');
      finalMongoURI = publicMongoURI;
    }
    
    if (!finalMongoURI) {
      throw new Error(`MongoDB URI not configured for environment: ${envConfig.environment}`);
    }
    
    const dbName = finalMongoURI.includes('localhost') ? 'localhost' : 'cloud';
    console.log(`Connecting to MongoDB... ${dbName} (${envConfig.environment})`);
    
    const conn = await mongoose.connect(finalMongoURI, {
      // Connection options for Railway and better reliability
      serverSelectionTimeoutMS: envConfig.isDevelopment ? 2000 : 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: envConfig.isDevelopment ? 5 : 10,
      retryWrites: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name} (${envConfig.environment})`);
    
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
    
    // In production, try to continue without database (graceful degradation)
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Server continuing without database connection...');
      return null;
    }
    
    // In development, don't crash but log the error
    console.log('🔄 Development mode: continuing without database...');
  }
};

module.exports = connectDB; 