# DormDuos

A housing marketplace web application built for UC Riverside students to find housing and connect with roommates near campus.

## About This Project

DormDuos is a full-stack web application that helps UCR students find housing and roommates. The platform allows landlords to post rental listings and students to browse and search for housing options with detailed filters.

**Current Features**: Housing listings with search and filter functionality
**Future Plans**: Roommate matching and in-app messaging system

**Note**: This platform facilitates connections between community members - users should always verify information and meet in person before making any commitments.

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS
- **Backend**: Node.js, Express, JWT authentication
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (frontend), Railway (backend)

## Features

### Implemented

- Browse housing listings with search and filters
- User authentication system for landlords
- Create, edit, and delete housing listings
- Responsive design for mobile and desktop
- Price, bedroom, and location filtering
- Secure password handling

### Planned

- Roommate matching system
- User messaging functionality
- Enhanced user profiles
- Image upload for listings

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/ucrhousing.git
cd ucrhousing
```

2. Install dependencies

```bash
npm run install:all
```

3. Set up environment variables
   Create a `.env` file in the backend directory:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ucrhousing
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

4. Start the development servers

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

5. Open http://localhost:5173 in your browser

## Project Structure

```
ucrhousing/
├── backend/                 # Express API server
│   ├── middleware/         # Authentication and security
│   ├── models/            # MongoDB data models
│   ├── routes/            # API route handlers
│   └── index.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Main page components
│   │   ├── contexts/      # React context providers
│   │   └── services/      # API service functions
│   └── public/            # Static assets
└── README.md
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Listing Endpoints

- `GET /api/listings` - Get all listings (supports filtering)
- `GET /api/listings/my` - Get current user's listings
- `POST /api/listings` - Create new listing (requires auth)
- `PUT /api/listings/:id` - Update listing (requires auth)
- `DELETE /api/listings/:id` - Delete listing (requires auth)

### Utility Endpoints

- `GET /api/health` - Application health check

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Basic rate limiting
- NoSQL injection prevention

## Deployment

The application is deployed using:

- **Frontend**: Vercel with automatic GitHub deployments
- **Backend**: Railway with automatic GitHub deployments
- **Database**: MongoDB Atlas cloud database
- **Domain**: Custom domain through Vercel

Required production environment variables:

```
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=secure-random-string
FRONTEND_URL=https://your-domain.com
NODE_ENV=production
```

## Testing

```bash
# Run all tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd frontend && npm test
```

## Development Notes

This project was built as a learning exercise to practice:

- Full-stack web development
- React frontend development
- Node.js/Express backend APIs
- MongoDB database design
- User authentication systems
- Responsive web design
- Cloud deployment strategies

## Contributing

This is a student project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Improvements

- Add image upload functionality for listings
- Implement roommate matching algorithm
- Add user rating and review system
- Email notification system
- Advanced search and filtering options
- Mobile app version

## License

This project is for educational purposes and community use.

## Contact

For questions or issues, please open a GitHub issue or contact the project maintainer.

---

Built by UCR students for the UCR community.
