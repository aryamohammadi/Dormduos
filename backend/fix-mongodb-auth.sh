#!/bin/bash

echo "🔧 MongoDB Authentication Fix"
echo "============================="
echo ""
echo "Your current connection string uses password: aryamshahi"
echo ""
echo "If this is NOT the correct password in MongoDB Atlas, you need to:"
echo ""
echo "1. Go to MongoDB Atlas → Database Access"
echo "2. Click on user 'aryamshahi'"
echo "3. Reset the password"
echo "4. Update your .env file with the new password"
echo ""
read -p "Do you want to update the password in .env now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -p "Enter the CORRECT password for user 'aryamshahi': " -s password
    echo ""
    
    if [ -z "$password" ]; then
        echo "❌ Password cannot be empty!"
        exit 1
    fi
    
    # URL encode special characters
    encoded_password=$(echo -n "$password" | sed 's/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g; s/+/%2B/g; s/\//%2F/g; s/=/%3D/g; s/?/%3F/g; s/ /%20/g')
    
    # Update .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|mongodb+srv://aryamshahi:[^@]*@|mongodb+srv://aryamshahi:${encoded_password}@|g" .env
    else
        # Linux
        sed -i "s|mongodb+srv://aryamshahi:[^@]*@|mongodb+srv://aryamshahi:${encoded_password}@|g" .env
    fi
    
    echo ""
    echo "✅ Updated .env file with new password"
    echo ""
    echo "🧪 Testing connection..."
    echo ""
    
    # Quick test
    node -e "
    require('dotenv').config();
    const mongoose = require('mongoose');
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB...');
    mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      .then(() => {
        console.log('✅ Connection successful!');
        process.exit(0);
      })
      .catch(err => {
        console.log('❌ Connection failed:', err.message);
        console.log('');
        console.log('Troubleshooting:');
        console.log('1. Verify password is correct in MongoDB Atlas');
        console.log('2. Check Network Access allows your IP');
        console.log('3. Verify user has proper database permissions');
        process.exit(1);
      });
    "
else
    echo ""
    echo "To fix manually:"
    echo "1. Reset password in MongoDB Atlas"
    echo "2. Edit backend/.env and update MONGODB_URI with the new password"
fi

