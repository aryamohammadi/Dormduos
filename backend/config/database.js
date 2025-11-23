const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    // Priority: MONGO_URL (Railway internal, free) > MONGODB_URI (MongoDB Atlas)
    // DO NOT use MONGO_PUBLIC_URL (external, incurs egress fees)
    const mongoURI = process.env.MONGO_URL || process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MongoDB connection string not found');
      console.error('Please set either MONGO_URL (Railway MongoDB) or MONGODB_URI (MongoDB Atlas)');
      console.error('⚠️  Do NOT use MONGO_PUBLIC_URL (it incurs egress fees)');
      if (process.env.NODE_ENV === 'production') {
        // In production, we should exit if DB is not configured
        process.exit(1);
      }
      return;
    }
    
    // Log which connection we're using (hide password)
    const connectionType = process.env.MONGO_URL ? 'Railway Internal (MONGO_URL)' : 'MongoDB Atlas (MONGODB_URI)';
    console.log(`🔌 Using ${connectionType}`);
    
    console.log('🔌 Connecting to MongoDB...');
    console.log('MongoDB URI:', mongoURI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs
    
    // Simplified connection options
    const connectOptions = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    };
    
    // Add database name if not in URI
    let finalURI = mongoURI;
    if (!mongoURI.includes('/ucrhousing') && !mongoURI.includes('?') && !mongoURI.endsWith('/')) {
      finalURI = mongoURI.endsWith('/') ? mongoURI + 'ucrhousing' : mongoURI + '/ucrhousing';
    }
    
    const conn = await mongoose.connect(finalURI, connectOptions);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection state: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Error name:', error.name);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    // Provide helpful error messages
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('💡 Authentication failed - check username/password in connection string');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('💡 DNS/Network error - check MongoDB Atlas Network Access (allow 0.0.0.0/0)');
    } else if (error.message.includes('timeout')) {
      console.error('💡 Connection timeout - check network access and firewall settings');
    }
    
    // In production, exit if connection fails (Railway will restart)
    if (process.env.NODE_ENV === 'production') {
      console.error('Exiting application - Railway will restart and retry');
      process.exit(1);
    } else {
      console.log('App continuing without database (development mode)...');
    }
  }
};

module.exports = connectDB; 