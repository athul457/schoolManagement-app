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

teacherRoute
  .route("/teacher/:id")
  .get(authAdmin, isAdmin, teacherController.getSingleTeacher);
teacherRoute
  .route("/teacher/teacher/:id")
  .get(authTeacher, isTeacher, teacherController.getOnlyTeacherData);
teacherRoute
  .route("/teacher/teacher/:id")
  .patch(authTeacher, isTeacher, teacherController.updateTeacher);
teacherRoute
  .route("/teacher/admin/:id")
  .patch(authAdmin, isAdmin, teacherController.adminUpdateTeacher);

module.exports = teacherRoute;
