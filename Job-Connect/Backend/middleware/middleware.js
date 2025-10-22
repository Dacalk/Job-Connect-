// Global app middleware + auth utilities
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

// Verify JWT token from cookies
function authenticateToken(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Role-based access control
function requireRole(allowedRoles) {
  return async (req, res, next) => {
    try {
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      
      req.userRole = user.role;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}

// Admin only access
function requireAdmin(req, res, next) {
  return requireRole(['admin'])(req, res, next);
}

// Employer access
function requireEmployer(req, res, next) {
  return requireRole(['employer', 'admin'])(req, res, next);
}

// Job seeker access
function requireJobSeeker(req, res, next) {
  return requireRole(['job_seeker', 'admin'])(req, res, next);
}

// Apply global middleware stack
function applyMiddleware(app) {
  app.use(helmet());
  app.use(cors({ 
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
    credentials: true 
  }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  app.use(limiter);
}

// Export default as a function (for server.js expectations) and include helpers
module.exports = applyMiddleware;
module.exports.authenticateToken = authenticateToken;
module.exports.requireRole = requireRole;
module.exports.requireAdmin = requireAdmin;
module.exports.requireEmployer = requireEmployer;
module.exports.requireJobSeeker = requireJobSeeker;
