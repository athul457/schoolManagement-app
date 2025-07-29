# � School Management Backend API

This is the **backend API** for a School Management System, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. It provides RESTful endpoints for managing students, exams, results, and authentication.

---

## 📁 Project Structure


  <ul>
    <li>--CONFIG/ Database connection & config files</span></li>
    <li>--CONTROLLERS/ Business logic for routes</span></li>
    <li>--MIDDLEWARES/ <span style="color: #888;"># Auth & error handling middleware</span></li>
    <li>--MODEL/ <span style="color: #888;"># Mongoose schemas/models</span></li>
    <li>--ROUTERS/ <span style="color: #888;"># Route definitions</span></li>
    <li class="file">--app.js <span style="color: #888;"># Express app setup</span></li>
    <li class="file">--server.js <span style="color: #888;"># App entry point</span></li>
    <li class="file">--package.json</li>
    <li class="file">--.gitignore</li>
  </ul>
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
