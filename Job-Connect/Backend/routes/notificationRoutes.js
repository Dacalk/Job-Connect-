const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');
const { authenticateToken } = require('../middleware/middleware');

// Get user notifications
router.get('/', authenticateToken, notificationController.getNotifications);

// Get unread notification count
router.get('/unread-count', authenticateToken, notificationController.getUnreadCount);

// Mark notification as read
router.put('/:notificationId/read', authenticateToken, notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', authenticateToken, notificationController.markAllAsRead);

// Delete notification
router.delete('/:notificationId', authenticateToken, notificationController.deleteNotification);

module.exports = router;