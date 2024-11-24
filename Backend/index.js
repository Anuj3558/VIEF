import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
// Import routes
import connectDB from './connection.js';
import clientRouter from './router/cilentRouter.js';
import authRouter from './router/authRouter.js';
import adminRouter from './router/adminRouter.js';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors()); // Enable CORS for all requests
connectDB();
// MongoDB connectio

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = decoded; // Attach decoded user information to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


app.use("/api",clientRouter)
app.use("/auth",authRouter)
app.use("/admin",adminRouter)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
