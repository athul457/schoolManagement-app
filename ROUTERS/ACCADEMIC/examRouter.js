const express = require("express");
const examRoute = express.Router();
const examController = require("../../CONTROLLERS/ACCADEMIC/examsController");
const authTeacher = require("../../MIDDLEWARES/authTeacher");
const isTeacher = require("../../MIDDLEWARES/isTeacher");

examRoute
  .route("/exam")
  .post(authTeacher, isTeacher, examController.createExam);
examRoute.route("/exam").get(authTeacher, isTeacher, examController.getAllExam);
examRoute
  .route("/exam/:id")
  .get(authTeacher, isTeacher, examController.getSingleExam);
examRoute
  .route("/exam/:id")
  .patch(authTeacher, isTeacher, examController.updateExam);

module.exports = examRoute;
