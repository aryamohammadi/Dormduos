/**
 * Environment Configuration for DormDuos
 * 
 * This file centralizes environment-specific settings to prevent
 * local development from accidentally hitting production databases.
 */

const environments = {
  development: {
    mongodb: 'mongodb://localhost:27017/ucrhousing-dev',
    frontend: 'http://localhost:5173',
    logLevel: 'debug',
    trustProxy: false
  },
  
  staging: {
    mongodb: process.env.STAGING_MONGODB_URI || 'mongodb://localhost:27017/ucrhousing-staging',
    frontend: process.env.STAGING_FRONTEND_URL || 'https://staging-dormduos.vercel.app',
    logLevel: 'info',
    trustProxy: true
  },
  
  production: {
    mongodb: process.env.MONGODB_URI,
    frontend: process.env.FRONTEND_URL || 'https://dormduos.com',
    logLevel: 'warn',
    trustProxy: true
  }
};

const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  const config = environments[env];
  
  if (!config) {
    throw new Error(`Unknown environment: ${env}`);
  }
  
  // Validation for production
  if (env === 'production') {
    if (!config.mongodb) {
      throw new Error('MONGODB_URI is required for production');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required for production');
    }
  }
  
  return {
    ...config,
    environment: env,
    isDevelopment: env === 'development',
    isStaging: env === 'staging',
    isProduction: env === 'production'
  };
};

module.exports = { getConfig, environments }; 