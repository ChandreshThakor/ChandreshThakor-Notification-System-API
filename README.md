# Notification System API

This project is a simple notification API system built with Node.js, Express, PostgreSQL, and Socket.IO for real-time notifications. The API includes user registration, login, sending notifications, receiving notifications, and marking notifications as read. Notifications are stored in a PostgreSQL database, and real-time communication is achieved using Socket.IO.

## Features

- **User Registration and Login**: Allows users to register and login with JWT-based authentication.
- **Send Notifications**: Send notifications to other users.
- **Real-Time Notifications**: Uses Socket.IO to enable real-time notification delivery.
- **Database Persistence**: Stores notifications in PostgreSQL for offline users.
- **Mark Notifications as Read**: Mark notifications as read once viewed.
- **Pagination**: Fetch notifications with pagination support.
- **Mark All as Read**: Mark all notifications as read.

---

## Technologies

- **Node.js**
- **Express.js**
- **PostgreSQL** (using Sequelize ORM)
- **Socket.IO** for real-time communication
- **JWT** for user authentication
- **bcrypt** for password hashing
- **Docker** (for optional containerization)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/notification-system.git
   cd notification-system

2. **Install dependencies**:
  ```base
  npm install


