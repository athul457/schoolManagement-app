const express = require("express");
const studentController = require("../../CONTROLLERS/STUDENT/studentController");
const isStudent = require("../../MIDDLEWARES/isStudent");
const authStudent = require("../../MIDDLEWARES/authStudent");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

const studentRoute = express.Router();
studentRoute
  .route("/student/register")
  .post(authAdmin, isAdmin, studentController.createStudent);
studentRoute.route("/student/login").post(studentController.loginStudent);
studentRoute
  .route("/student")
  .get(authAdmin, isAdmin, studentController.getAllStudent);

studentRoute
  .route("/student/:id")
  .get(authAdmin, isAdmin, studentController.getSingleStudent);

studentRoute
  .route("/student/student/:id")
  .get(authStudent, studentController.StudentGetStudent);

studentRoute
  .route("/student/:id")
  .patch(authAdmin, isAdmin, studentController.updateStudent);

module.exports = studentRoute;
