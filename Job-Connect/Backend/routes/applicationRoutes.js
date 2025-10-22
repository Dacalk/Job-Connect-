const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const applicationController = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/middleware');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});

// Submit application with file uploads
router.post('/', authenticateToken, upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]), applicationController.submitApplication);

// Get applications for a specific job (employer view)
router.get('/job/:jobId', authenticateToken, applicationController.getJobApplications);

// Get user's applications (job seeker view)
router.get('/user', authenticateToken, applicationController.getUserApplications);

// Update application status
router.put('/:applicationId/status', authenticateToken, applicationController.updateApplicationStatus);

// Delete application
router.delete('/:applicationId', authenticateToken, applicationController.deleteApplication);

// Mark application as viewed
router.put('/:applicationId/view', authenticateToken, applicationController.markApplicationAsViewed);

module.exports = router;