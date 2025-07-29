// Middleware to sanitize request body and prevent NoSQL injection
const sanitizeInput = (req, res, next) => {
  // List of dangerous MongoDB operators to remove
  const dangerousOperators = [
    '$where',
    '$ne',
    '$in',
    '$nin',
    '$gt',
    '$gte',
    '$lt',
    '$lte',
    '$exists',
    '$regex',
    '$options',
    '$expr',
    '$jsonSchema',
    '$mod',
    '$all',
    '$size',
    '$elemMatch',
    '$slice'
  ];

  // Recursively sanitize object
  const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      // Remove dangerous operators
      if (dangerousOperators.includes(key)) {
        console.log(`🛡️  Blocked dangerous MongoDB operator: ${key}`);
        continue; // Skip this key entirely
      }

      // Recursively sanitize nested objects
      sanitized[key] = sanitizeObject(value);
    }

    return sanitized;
  };

  // Sanitize request body
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }

  next();
};

module.exports = { sanitizeInput }; 