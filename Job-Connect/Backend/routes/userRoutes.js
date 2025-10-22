const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/middleware');
const { validateProfile } = require('../middleware/validation');
const upload = require('../middleware/upload');

// Protected routes (authentication required)
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, validateProfile, userController.updateProfile);
router.post('/upload-cover-letter', authenticateToken, upload.single('coverLetter'), userController.uploadCoverLetter);
router.get('/dashboard', authenticateToken, userController.getDashboard);
router.get('/all', authenticateToken, userController.getAllUsers);
router.delete('/account', authenticateToken, userController.deleteAccount);

module.exports = router;
