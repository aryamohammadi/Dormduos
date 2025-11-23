# DormDuos

A production-ready full-stack housing marketplace platform serving UC Riverside students. Built with Node.js, Express, and MongoDB, the application handles authentication, listing management, and search functionality with a focus on reliability and security.

## Overview

DormDuos is a full-stack web application that connects UCR students with off-campus housing options. The platform processes dozens of listing requests weekly, serving hundreds of active users searching for housing near campus. The system implements a RESTful API architecture with JWT-based authentication, MongoDB for data persistence, and comprehensive input validation to ensure data integrity and security.

The application demonstrates production-level engineering practices including automated testing, environment-based configuration, and cloud deployment strategies. The backend API handles complex filtering queries, pagination, and real-time listing updates while maintaining sub-second response times.

## Features

**Authentication and Authorization**
- JWT-based authentication system with secure token generation and validation
- Password hashing using bcrypt with 12 salt rounds
- Protected API routes with middleware-based authorization
- Session management with token expiration handling

**Listing Management**
- CRUD operations for housing listings with ownership validation
- Advanced search and filtering by price range, bedrooms, bathrooms, and amenities
- Pagination support for large result sets
- Listing status management (active, inactive, rented)
- View tracking and analytics for landlords

**API and Data Layer**
- RESTful API design with consistent error handling
- MongoDB schema design with proper indexing for query optimization
- Input sanitization middleware preventing NoSQL injection attacks
- Comprehensive validation at both model and route levels

**Production Features**
- Health check endpoints for monitoring and diagnostics
- Environment-based configuration for development, staging, and production
- CORS configuration supporting multiple frontend origins
- Error handling with appropriate HTTP status codes
- Request logging and debugging utilities

## Tech Stack

**Backend**
- Node.js 16+ with Express 5.1.0
- MongoDB with Mongoose ODM for schema management
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment configuration

**Frontend**
- React 19.1.0 with Vite build tool
- React Router for client-side routing
- Tailwind CSS for styling
- Context API for state management

**Testing**
- Jest for backend unit and integration testing
- Vitest for frontend component testing
- MongoDB Memory Server for isolated test database
- Supertest for API endpoint testing

**Deployment**
- Railway for backend hosting with automatic deployments
- Vercel for frontend hosting with CDN distribution
- MongoDB Atlas for managed database hosting
- Environment variable management across environments

## Architecture

The application follows a three-tier architecture pattern with clear separation between presentation, business logic, and data layers.

**API Layer (Express Routes)**
The Express server exposes RESTful endpoints organized by resource type. Route handlers delegate business logic to model methods and use middleware for cross-cutting concerns like authentication and input validation. The API layer handles HTTP request parsing, response formatting, and error translation.

**Business Logic Layer (Models and Middleware)**
Mongoose models encapsulate data validation rules and business logic. Pre-save hooks handle password hashing and data transformation. Static and instance methods provide reusable query patterns. Middleware functions handle authentication token verification, input sanitization, and security header injection.

**Data Layer (MongoDB)**
MongoDB stores application data with schema enforcement through Mongoose. Indexes on frequently queried fields (status, price, bedrooms) optimize query performance. The database connection is managed through a centralized configuration module that handles connection pooling and error recovery.

**Request Flow**
1. Client sends HTTP request to Express server
2. CORS middleware validates origin and sets appropriate headers
3. Input sanitization middleware removes dangerous operators
4. Authentication middleware verifies JWT tokens for protected routes
5. Route handler processes request and queries MongoDB through Mongoose
6. Response is formatted and returned with appropriate status code

**Security Architecture**
The application implements defense in depth with multiple security layers. Input sanitization prevents NoSQL injection by filtering MongoDB operators from user input. Password hashing ensures credentials are never stored in plain text. JWT tokens provide stateless authentication without server-side session storage. CORS configuration restricts API access to authorized frontend origins.

## API Endpoints

**Authentication**
```
POST   /api/auth/register    Register new landlord account
POST   /api/auth/login       Authenticate and receive JWT token
GET    /api/auth/me          Get current authenticated user (protected)
```

**Listings**
```
GET    /api/listings         Get all active listings with optional filters
GET    /api/listings/my      Get authenticated landlord's listings (protected)
GET    /api/listings/:id     Get single listing by ID
POST   /api/listings         Create new listing (protected)
PUT    /api/listings/:id     Update listing (protected, ownership required)
DELETE /api/listings/:id     Delete listing (protected, ownership required)
PUT    /api/listings/:id/toggle-status  Toggle listing status (protected)
```

**Health and Monitoring**
```
GET    /api/health           Basic health check
GET    /api/health/env       Environment variable status
GET    /api/health/detailed  Detailed system health information
```

**Query Parameters for Listings**
- `page`: Page number for pagination (default: 1)
- `limit`: Results per page (default: 20, max: 50)
- `minPrice`: Minimum monthly rent
- `maxPrice`: Maximum monthly rent
- `bedrooms`: Exact number of bedrooms
- `bathrooms`: Exact number of bathrooms
- `amenities`: Array of amenity values
- `search`: Text search across title, description, and address

## Testing

The application includes comprehensive test coverage for both backend and frontend components.

**Backend Testing**
- Unit tests for Mongoose models validating schema constraints and business logic
- Middleware tests for authentication and input sanitization
- Integration tests for API endpoints using Supertest
- Test database isolation using MongoDB Memory Server
- Coverage thresholds enforced at 100% for critical paths

**Test Execution**
```bash
# Run all tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd frontend && npm run test:run

# Test coverage reports
npm run test:coverage
```

**Testing Strategy**
Tests follow the AAA pattern (Arrange, Act, Assert) with clear test descriptions. Integration tests verify complete request-response cycles including authentication, validation, and database operations. Test helpers provide reusable functions for creating test data and generating authentication tokens.

## Deployment

The application is deployed across multiple cloud services with environment-specific configurations.

**Backend Deployment (Railway)**
- Automatic deployments from GitHub main branch
- Environment variables managed through Railway dashboard
- MongoDB Atlas connection string configured for production
- Health check endpoints monitored for uptime

**Frontend Deployment (Vercel)**
- Automatic deployments on git push
- CDN distribution for global performance
- Environment variables for API endpoint configuration
- Custom domain configuration

**Database (MongoDB Atlas)**
- Managed MongoDB cluster with automated backups
- Connection string authentication
- Network access restrictions
- Monitoring and performance metrics

**Environment Configuration**
Production environment requires the following variables:
```
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
JWT_SECRET=secure-random-string-minimum-32-characters
FRONTEND_URL=https://dormduos.com
NODE_ENV=production
```

**Deployment Process**
1. Code changes pushed to GitHub repository
2. Railway detects changes and triggers backend build
3. Vercel detects changes and triggers frontend build
4. Environment variables validated before deployment
5. Health checks confirm successful deployment
6. Smoke tests verify critical endpoints

## Local Development

**Prerequisites**
- Node.js version 16 or higher
- npm version 8 or higher
- MongoDB instance (local or Atlas connection string)
- Git

**Setup Instructions**

1. Clone the repository
```bash
git clone https://github.com/your-username/ucrhousing.git
cd ucrhousing
```

2. Install dependencies
```bash
npm run install:all
```

3. Configure environment variables

Create `backend/.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ucrhousing
JWT_SECRET=development-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. Start development servers

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

5. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

**Development Workflow**
- Backend uses nodemon for automatic server restarts
- Frontend uses Vite HMR for instant UI updates
- MongoDB connection retries automatically on failure
- Console logging provides request and error details

**Database Setup**
For local development, ensure MongoDB is running:
```bash
# Using Homebrew on macOS
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

## Project Structure

```
ucrhousing/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection configuration
│   │   ├── cors.js              # CORS policy configuration
│   │   └── environments.js      # Environment-specific settings
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── sanitize.js          # Input sanitization middleware
│   │   └── security.js          # Security headers middleware
│   ├── models/
│   │   ├── Landlord.js          # Landlord schema and methods
│   │   └── Listing.js           # Listing schema and methods
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── listings.js          # Listing CRUD endpoints
│   │   └── health.js             # Health check endpoints
│   ├── tests/
│   │   ├── integration/        # API integration tests
│   │   ├── unit/                # Unit tests for models and middleware
│   │   ├── helpers/             # Test utility functions
│   │   └── setup.js             # Test environment configuration
│   ├── index.js                 # Express server entry point
│   └── package.json             # Backend dependencies and scripts
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── contexts/           # React context providers
│   │   ├── pages/               # Page-level components
│   │   ├── services/            # API service layer
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── public/                  # Static assets
│   └── package.json            # Frontend dependencies and scripts
├── scripts/
│   └── smoke-test.js           # Production smoke testing script
├── package.json                # Root workspace configuration
└── README.md                   # Project documentation
```

**Key Design Decisions**
- Monorepo structure allows shared tooling and consistent dependency management
- Separation of backend and frontend enables independent scaling and deployment
- Test directory mirrors source structure for easy navigation
- Configuration files centralized for environment management
- Service layer abstracts API communication from components

## Performance and Reliability

The application is designed to handle production workloads with attention to performance and reliability.

**Database Optimization**
- Indexes on frequently queried fields reduce query execution time
- Connection pooling manages database connections efficiently
- Query result pagination prevents large dataset transfers

**API Performance**
- Middleware chain optimized to minimize request processing time
- Response caching strategies for frequently accessed data
- Error handling prevents cascading failures

**Monitoring and Observability**
- Health check endpoints enable uptime monitoring
- Request logging provides debugging information
- Error tracking identifies issues in production

**Scalability Considerations**
- Stateless API design allows horizontal scaling
- Database connection pooling supports concurrent requests
- CDN distribution reduces frontend load times globally

## License

This project is for educational purposes and community use.
