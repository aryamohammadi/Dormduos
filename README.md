# UCR Housing Platform

A web application for UC Riverside students to find and post housing listings near campus. Built as a community platform where students can connect directly with landlords and property owners.

## What This Is

This is basically a housing board for UCR students. Think of it like Craigslist but specifically for student housing around campus. Students can browse available places to rent, and landlords can post their properties.

**Important**: This platform just connects people - we don't verify landlords or guarantee anything. Always do your own research and meet in person before making any commitments.

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS for styling
- **Backend**: Node.js with Express, JWT authentication
- **Database**: MongoDB with Mongoose
- **Hosting**: Vercel (frontend) and Railway (backend + database)

## Features

- Browse housing listings with filters (price, bedrooms, location)
- User authentication for landlords to post listings
- Responsive design that works on mobile and desktop
- Search and filter functionality
- Direct contact between students and landlords
- Secure password hashing and input sanitization

## Getting Started Locally

### Prerequisites

- Node.js (version 16 or higher)
- MongoDB (either local installation or MongoDB Atlas)
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/ucrhousing.git
cd ucrhousing
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Set up environment variables
   Create a `.env` file in the backend directory:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ucrhousing
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

5. Start the backend server

```bash
cd backend
npm run dev
```

6. Start the frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

The app should now be running at `http://localhost:5173`

## Live Demo

The application is deployed and running at:

- **Website**: https://ucr-housing.vercel.app
- **API**: https://backend-api-production-cc33.up.railway.app

## Project Structure

```
ucrhousing/
├── backend/                 # Express.js API server
│   ├── config/             # Database and CORS configuration
│   ├── middleware/         # Authentication and validation
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── index.js           # Main server file
├── frontend/               # React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # Reusable React components
│       ├── contexts/      # React Context for auth
│       ├── pages/         # Main page components
│       └── services/      # API communication
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new landlord
- `POST /api/auth/login` - Login existing user

### Listings

- `GET /api/listings` - Get all listings (with optional filters)
- `GET /api/listings/:id` - Get specific listing
- `POST /api/listings` - Create new listing (auth required)
- `PUT /api/listings/:id` - Update listing (auth required)
- `DELETE /api/listings/:id` - Delete listing (auth required)

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input sanitization to prevent MongoDB injection
- CORS configured for production
- Rate limiting on sensitive endpoints

## Deployment

This app is set up for easy deployment:

### Frontend (Vercel)

The frontend automatically deploys when you push to the main branch if connected to Vercel.

### Backend (Railway)

The backend is deployed on Railway with automatic deploys from GitHub.

### Database

MongoDB is hosted on Railway's free tier.

## Contributing

This is a student project, but if you want to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Known Issues

- Search functionality could be improved with fuzzy matching
- No image upload for listings yet
- Mobile responsive design needs some tweaks
- Error handling could be more user-friendly

## Future Improvements

- Add image upload for listings
- Implement user favorites/bookmarks
- Add email notifications for new listings
- Better search with location-based filtering
- User ratings and reviews system

## Disclaimer

This platform is for educational purposes and facilitates connections between students and landlords. We do not verify landlords, guarantee housing quality, or take responsibility for any agreements made through this platform. Always exercise caution and verify all information independently.

## Contact

If you find bugs or have suggestions, feel free to open an issue on GitHub.

Built by a UCR student for the UCR community.
