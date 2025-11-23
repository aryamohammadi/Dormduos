#!/bin/bash

# MongoDB Atlas Connection String Setup Helper
# This script helps you set up your MongoDB connection string

echo "🔧 MongoDB Atlas Connection Setup"
echo "=================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Creating it..."
    cat > .env << 'ENVEOF'
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://aryamshahi:<db_password>@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true&w=majority
JWT_SECRET=development-secret-key-change-in-production-minimum-32-characters
FRONTEND_URL=http://localhost:5173
ENVEOF
    echo "✅ Created .env file"
    echo ""
fi

echo "📋 Your MongoDB Atlas Connection String:"
echo "   mongodb+srv://aryamshahi:<db_password>@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true&w=majority"
echo ""
echo "⚠️  IMPORTANT: Replace <db_password> with your actual database password"
echo ""
read -p "Enter your MongoDB Atlas password: " -s password
echo ""

# URL encode special characters in password
encoded_password=$(echo -n "$password" | sed 's/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g; s/+/%2B/g; s/\//%2F/g; s/=/%3D/g; s/?/%3F/g; s/ /%20/g')

# Update .env file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|<db_password>|$encoded_password|g" .env
else
    # Linux
    sed -i "s|<db_password>|$encoded_password|g" .env
fi

echo "✅ Updated .env file with your password"
echo ""
echo "🧪 Testing MongoDB connection..."
echo ""

# Test connection by starting the server briefly
timeout 5 npm run dev 2>&1 | grep -E "(MongoDB Connected|MongoDB connection failed|MONGODB_URI)" || echo "⚠️  Could not test connection automatically. Run 'npm run dev' manually to test."

echo ""
echo "✅ Setup complete! Your .env file is configured."
echo "   Run 'npm run dev' to start the server and verify the connection."

