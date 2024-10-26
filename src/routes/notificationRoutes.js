const express = require('express');
const { sendNotification, getNotifications, markAsRead, markAllAsRead } = require('../controllare/notificationController');
const auth = require('../middleware/authMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/mark-all-read', authenticateJWT, markAllAsRead);
router.post('/send', authenticateJWT, sendNotification);
router.get('/', authenticateJWT, getNotifications);
router.put('/:id/read', authenticateJWT, markAsRead);

module.exports = router;
