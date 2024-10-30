
# Notification System API

This project is a simple notification API system built with Node.js, Express, PostgreSQL, and Socket.IO for real-time notifications. The API includes user registration, login, sending notifications, receiving notifications, and marking notifications as read. Notifications are stored in a PostgreSQL database, and real-time communication is achieved using Socket.IO.

## Features

- **User Registration and Login**: Allows users to register and login with JWT-based authentication.
- **Send Notifications**: Send notifications to other users.
- **Real-Time Notifications**: Uses Socket.IO to enable real-time notification delivery.
- **Database Persistence**: Stores notifications in PostgreSQL for offline users.
- **Mark Notifications as Read**: Mark notifications as read once viewed.
- **Pagination**: Fetch notifications with pagination support.
- **Mark All as Read **: Mark all notifications as read.

---

## Technologies

- **Node.js**
- **Express.js**
- **PostgreSQL** (using Sequelize ORM)
- **Socket.IO** for real-time communication
- **JWT** for user authentication
- **bcrypt** for password hashing

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ChandreshThakor/ChandreshThakor-Notification-System-API.git
   cd ChandreshThakor-Notification-System-API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Make sure PostgreSQL is installed and running.
   - Create a new PostgreSQL database for this application.

4. **Set up environment variables**:  
   Create a `.env` file in the root of the project and configure it as follows:

   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/chat_app
   JWT_SECRET=your_jwt_secret
   ```

   Replace `username`, `password`, and `yourdatabase` with your PostgreSQL credentials.

---

## Running the Application

1. **Set Up Database**:
   Create a new PostgreSQL database
	
   ```bash
   createdb -U your_username database-name
   ```

2. **Database Migration**:
   Run Sequelize migrations to create the necessary tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

4. The server should now be running at `http://localhost:3000`.

---

## API Documentation

### 1. User Registration

- **Endpoint**: `POST /users/register`
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

### 2. User Login

- **Endpoint**: `POST /users/login`
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "password123"
    "lang": "en"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### 3. Send Notification

- **Endpoint**: `POST /notifications/send`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "senderId": 1,
    "receiverId": 2,
    "message": "Hello from user123"
  }
  ```

### 4. Get Notifications

- **Endpoint**: `GET /notifications`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

### 5. Mark Notification as Read

- **Endpoint**: `PUT /notifications/:id/read`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

### 6. Mark All Notifications as Read (Bonus)

- **Endpoint**: `PUT /notifications/mark-all-read`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

### 7. Get Notifications with Pagination (Bonus)

- **Endpoint**: `GET /notifications?page=1&limit=10`
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```

---
