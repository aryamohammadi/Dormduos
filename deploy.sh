#!/bin/bash

# UCR Housing Platform Deployment Script
echo "🚀 Starting UCR Housing Platform Deployment..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to deploy backend
deploy_backend() {
    echo "📦 Deploying Backend to Railway..."
    cd backend
    
    # Check if railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "⚠️  Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    # Initialize Railway project if not exists
    if [ ! -f "railway.json" ]; then
        echo "🔧 Initializing Railway project..."
        railway login
        railway new ucrhousing-backend
    fi
    
    # Deploy backend
    railway deploy
    
    echo "✅ Backend deployed!"
    cd ..
}

# Function to deploy frontend
deploy_frontend() {
    echo "🌐 Preparing Frontend for Deployment..."
    cd frontend
    
    # Install dependencies
    npm install
    
    # Build for production
    echo "🔨 Building frontend..."
    npm run build
    
    # Check if vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "⚠️  Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Frontend deployed!"
    cd ..
}

# Main deployment flow
echo "Select deployment option:"
echo "1) Deploy Backend only"
echo "2) Deploy Frontend only" 
echo "3) Deploy Both (Full Stack)"
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        deploy_backend
        ;;
    2)
        deploy_frontend
        ;;
    3)
        deploy_backend
        echo ""
        deploy_frontend
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed!"
echo "📋 Don't forget to:"
echo "   - Set environment variables in Railway dashboard"
echo "   - Update FRONTEND_URL in backend env vars"
echo "   - Update VITE_API_URL in frontend for production" 