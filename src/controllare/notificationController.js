const Notification = require('../model/Notification');
const User = require('../model/User');
const { getSocket } = require('../utils/socket'); // Adjust path as necessary


// Send a notification
exports.sendNotification = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ message: res.__('errors.requiredFields') });
    }

    if (message.length > 255) {
        return res.status(400).json({ message: res.__('errors.messageLength') });
    }

    try {
        const receiver = await User.findByPk(receiverId);
        if (!receiver) return res.status(404).json({ message: res.__('errors.receiverNotFound') });

        // Store the notification in the database
        const notification = await Notification.create({ senderId, receiverId, message });

        // Emit notification to the receiver
        const io = getSocket(); // Get the socket instance
        io.to(receiverId).emit('receive_notification', {
            senderId,
            message,
            notificationId: notification.id,
        });

        res.status(201).json({ message: res.__('success.notificationSent'), notification });
    } catch (err) {
        res.status(500).json({ message: res.__('errors.sendFailed'), error: err.message });
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
        res.status(500).json({ message: res.__('errors.retrieveFailed'), error: err.message });
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
        res.status(200).json({ message: res.__('success.notificationMarkedRead'), notification });
    } catch (err) {
        res.status(500).json({ message: res.__('errors.updateFailed'), error: err.message });
    }
};

exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.update({ isRead: true }, { where: { receiverId: req.user.userId, isRead: false } });
        res.json({ message: res.__('success.allNotificationsMarkedRead') });
    } catch (err) {
        res.status(500).json({ message: res.__('errors.markFailed'), error: err.message });
    }
};
