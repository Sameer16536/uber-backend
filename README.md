# Chat Application Backend

A robust backend service for a real-time chat application built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication (Register/Login)
- JWT-based authorization
- Token blacklisting
- Real-time messaging (coming soon)

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Socket.IO (coming soon)

## 📝 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:
env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key



## 🏃‍♂️ Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## 🔑 API Endpoints

### User Routes (`/users`)

| Method | Endpoint    | Description      | Required Body                                    |
|--------|------------|------------------|--------------------------------------------------|
| POST   | /register  | Register new user| `email`, `fullName.firstName`, `fullName.lastName`, `password` |
| POST   | /login     | Login user       | `email`, `password`                              |

## 📊 HTTP Status Codes

| Status Code | Description                                           |
|------------|-------------------------------------------------------|
| 200        | OK - Request successful                               |
| 201        | Created - Resource successfully created               |
| 400        | Bad Request - Invalid input or validation failed      |
| 401        | Unauthorized - Invalid or missing authentication      |
| 409        | Conflict - Resource already exists                    |
| 500        | Internal Server Error - Server encountered an error   |

### Detailed Status Code Usage

#### 200 OK
- Successful GET requests
- Successful login

#### 201 Created
- Successful user registration

#### 400 Bad Request
- Invalid email format
- Password too short
- Missing required fields
- Validation errors

#### 401 Unauthorized
- Invalid login credentials
- Invalid or expired JWT
- Blacklisted token

#### 409 Conflict
- Email already registered

#### 500 Internal Server Error
- Database connection errors
- Unexpected server errors

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the request header:



## 🛡️ Security Features

1. Password Hashing (bcrypt)
2. JWT Token Authentication
3. Token Blacklisting
4. Input Validation
5. Protected Routes Middleware

## 📦 Project Structure

## 🛡️ Security Features

1. Password Hashing (bcrypt)
2. JWT Token Authentication
3. Token Blacklisting
4. Input Validation
5. Protected Routes Middleware

## 📦 Project Structure
backend/
├── controllers/ # Route controllers
├── middleware/ # Custom middleware
├── models/ # Database models
├── routes/ # API routes
├── services/ # Business logic
├── db/ # Database configuration
├── app.js # Express app setup
└── server.js # Server entry point


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.