
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const userRoutes = require('./userRoutes');
const applicationRoutes = require('./applicationRoutes');
const notificationRoutes = require('./notificationRoutes');
const companyRoutes = require('./companyRoutes');

// Mount auth routes at /auth (server mounts base at /api)
router.use('/auth', authRoutes);

// Mount job routes at /jobs (server mounts base at /api)
router.use('/jobs', jobRoutes);

// Mount user routes at /users (server mounts base at /api)
router.use('/users', userRoutes);

// Mount application routes at /applications (server mounts base at /api)
router.use('/applications', applicationRoutes);

// Mount notification routes at /notifications (server mounts base at /api)
router.use('/notifications', notificationRoutes);

// Mount company routes at /companies (server mounts base at /api)
router.use('/companies', companyRoutes);

module.exports = router;

