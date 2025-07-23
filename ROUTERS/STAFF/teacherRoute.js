const express = require("express");
const teacherRoute = express.Router();
const teacherController = require("../../CONTROLLERS/STAFF/teacherController");
const isAdmin = require("../../MIDDLEWARES/isAdmin");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const authTeacher = require("../../MIDDLEWARES/authTeacher");
const isTeacher = require("../../MIDDLEWARES/isTeacher");

teacherRoute
  .route("/teacher/register")
  .post(authAdmin, teacherController.registerTeacher);
teacherRoute.route("/teacher/login").post(teacherController.loginTeacher);
teacherRoute
  .route("/teacher")
  .get(authAdmin, isAdmin, teacherController.getAllTeachers);

module.exports = teacherRoute;
