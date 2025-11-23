# MongoDB Atlas Setup Guide

## Step 1: Get Your Connection String from MongoDB Atlas

1. In MongoDB Atlas, click **"Drivers"** (the Node.js option)
2. You'll see a connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
3. **Copy this connection string**

## Step 2: Configure Network Access

1. In MongoDB Atlas, go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For local development, click **"Add Current IP Address"** or **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Note: For production, restrict to specific IPs
4. Click **"Confirm"**

## Step 3: Create Database User (if not done)

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username and strong password
5. Set user privileges to **"Read and write to any database"** (or more restrictive)
6. Click **"Add User"**

## Step 4: Update Connection String

Replace the placeholders in your connection string:
- `<username>` → Your database username
- `<password>` → Your database password
- Add database name at the end: `/ucrhousing`

Final format:
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/ucrhousing?retryWrites=true&w=majority
```

## Step 5: Create Backend .env File

Create a file: `backend/.env`

```bash
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/ucrhousing?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
```

## Step 6: Test Connection

Run the backend server:
```bash
cd backend
npm run dev
```

You should see:
```
Connecting to MongoDB...
MongoDB Connected: cluster0.xxxxx.mongodb.net
Database: ucrhousing
```

## Troubleshooting

### Connection Timeout
- Check Network Access settings in Atlas
- Verify your IP is whitelisted
- Check firewall settings

### Authentication Failed
- Verify username and password are correct
- Check database user exists and has proper permissions
- URL-encode special characters in password (e.g., @ becomes %40)

### Invalid Connection String
- Make sure connection string includes `/ucrhousing` database name
- Verify cluster name matches your actual cluster
- Check for typos in username/password
