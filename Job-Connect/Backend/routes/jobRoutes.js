const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');
const { authenticateToken } = require('../middleware/middleware');
const { validateJob } = require('../middleware/validation');

// Public routes (no authentication required)
router.get('/', jobController.getAllJobs);
router.get('/search', jobController.searchJobs);
router.get('/stats', jobController.getJobStats);
router.get('/company/:companyId', jobController.getJobsByCompany);
router.get('/:id', jobController.getJobById);

// Protected routes (authentication required)
router.get('/my-jobs', authenticateToken, jobController.getJobsByUser);
router.get('/:jobId/applications', authenticateToken, jobController.getJobApplications);
router.post('/', authenticateToken, validateJob, jobController.createJob);
router.put('/:id', authenticateToken, validateJob, jobController.updateJob);
router.delete('/:id', authenticateToken, jobController.deleteJob);

module.exports = router;
