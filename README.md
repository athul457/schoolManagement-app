# � School Management Backend API

This is the **backend API** for a School Management System, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. It provides RESTful endpoints for managing students, exams, results, and authentication.

---

## 📁 Project Structure

schoolManagement-app-master/
CONFIG/ # Database connection & config files
CONTROLLERS/ # Business logic for routes
MIDDLEWARES/ # Auth & error handling middleware
MODEL/ # Mongoose schemas/models
ROUTERS/ # Route definitions
app.js # Express app setup
server.js # App entry point
package.json
.gitignore

---

## 🚀 Features

- **👨‍🎓 Student Management**: Create, update, and authenticate students
- **📝 Exam Management**: Create and assign exams with questions
- **📊 Exam Results**: Calculate and store results
- **🔐 Authentication**: JWT-based login with hashed passwords
- **📦 Modular Code**: Organized for scalability
- **🌐 REST API**: Ready for frontend/mobile integration

---

## 🛠️ Installation

### 1. Clone the repository

## git clone https://github.com/yourusername/schoolManagement-app-master.git
cd schoolManagement-app-master

## Dependencies
- **express
- **mongoose
- **bcryptjs
- **jsonwebtoken
- **dotenv
- **morgan
- **express-async-handler
