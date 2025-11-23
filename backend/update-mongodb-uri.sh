#!/bin/bash

# Helper script to update MongoDB URI in .env file
# This script will help you securely add your MongoDB password

echo "🔐 MongoDB Connection String Setup"
echo "==================================="
echo ""
echo "Your connection string format:"
echo "mongodb+srv://aryamshahi:[YOUR_PASSWORD]@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true&w=majority"
echo ""
echo "⚠️  If your password contains special characters, they need to be URL-encoded:"
echo "   @ → %40    # → %23    $ → %24    & → %26"
echo "   + → %2B    / → %2F    = → %3D    ? → %3F    Space → %20"
echo ""

read -p "Enter your MongoDB Atlas password for user 'aryamshahi': " -s password
echo ""

if [ -z "$password" ]; then
    echo "❌ Password cannot be empty!"
    exit 1
fi

# URL encode special characters
encoded_password=$(echo -n "$password" | sed 's/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g; s/+/%2B/g; s/\//%2F/g; s/=/%3D/g; s/?/%3F/g; s/ /%20/g')

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Creating it..."
    cat > .env << ENVEOF
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://aryamshahi:${encoded_password}@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true&w=majority
JWT_SECRET=development-secret-key-change-in-production-minimum-32-characters
FRONTEND_URL=http://localhost:5173
ENVEOF
else
    # Update existing .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|MONGODB_URI=.*|MONGODB_URI=mongodb+srv://aryamshahi:${encoded_password}@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true\&w=majority|g" .env
    else
        # Linux
        sed -i "s|MONGODB_URI=.*|MONGODB_URI=mongodb+srv://aryamshahi:${encoded_password}@ucrhousing.dwksdpy.mongodb.net/ucrhousing?retryWrites=true\&w=majority|g" .env
    fi
fi

echo ""
echo "✅ Updated .env file with your MongoDB connection string"
echo ""
echo "🧪 Testing connection..."
echo "   (Starting server for 5 seconds to test connection...)"
echo ""

# Test the connection
cd "$(dirname "$0")"
timeout 10 npm run dev 2>&1 | head -20 || echo ""
echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 To verify the connection, run: npm run dev"
echo "   You should see: 'MongoDB Connected: ucrhousing.dwksdpy.mongodb.net'"

