const Notification = require('../model/Notification');
const User = require('../model/User');
const { getSocket } = require('../utils/socket'); // Adjust path as necessary


// Send a notification
exports.sendNotification = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ message: 'senderId, receiverId, and message are required' });
    }

    if (message.length > 255) {
        return res.status(400).json({ message: 'Message length cannot exceed 255 characters' });
    }

    try {
        const receiver = await User.findByPk(receiverId);
        if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

        // Store the notification in the database
        const notification = await Notification.create({ senderId, receiverId, message });

        // Emit notification to the receiver
        const io = getSocket(); // Get the socket instance

        io.to(receiverId).emit('receive_notification', {
            senderId,
            message,
            notificationId: notification.id,
        });

        res.status(201).json({ message: 'Notification sent', notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send notification', error: err.message });
    }
};

// Get notifications for a user
exports.getNotifications = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
    const offset = (page - 1) * limit;

    try {
        const notifications = await Notification.findAndCountAll({
            where: { receiverId: req.user.userId },
            order: [['createdAt', 'DESC']],
            offset,
            limit: parseInt(limit),
        });
        res.json({
            total: notifications.count,
            pages: Math.ceil(notifications.count / limit),
            data: notifications.rows,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve notifications', error: err.message });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByPk(id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        notification.isRead = true;
        await notification.save();
        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notification', error: err.message });
    }
};

exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.update({ isRead: true }, { where: { receiverId: req.user.userId, isRead: false } });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark notifications as read', error: err.message });
    }
};
