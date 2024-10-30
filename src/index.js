const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { initSocket } = require('./utils/socket'); // Adjust path as necessary
require('dotenv').config();
const i18n = require('./utils/i18nConfig');


const app = express();
app.use(express.json());
app.use(i18n.init); 

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server);

initSocket(server); // Initialize the socket here

app.use('/users', authRoutes);
app.use('/notifications', notificationRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Socket.IO setup for real-time notifications
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle sending notifications
  socket.on('send_notification', ({ senderId, receiverId, message }) => {
    // Emit notification to the specific receiver
    socket.to(receiverId).emit('receive_notification', {
      senderId,
      message,
    });
    
    // Store the notification in the database
    Notification.create({ senderId, receiverId, message })
      .then(() => console.log('Notification stored'))
      .catch(err => console.error('Failed to store notification:', err));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Sync database and start server
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database sync failed:', err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
