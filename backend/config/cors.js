const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like from Postman or mobile apps)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Just in case we switch ports
      process.env.FRONTEND_URL, // Whatever domain we deploy to
    ].filter(Boolean); // Get rid of any undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions; 