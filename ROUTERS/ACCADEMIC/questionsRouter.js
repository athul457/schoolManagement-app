const express = require("express");
const questionRoute = express.Router();
const questionController = require("../../CONTROLLERS/ACCADEMIC/questionsController");
const authTeacher = require("../../MIDDLEWARES/authTeacher");
const isTeacher = require("../../MIDDLEWARES/isTeacher");

questionRoute
  .route("/exam/:id")
  .post(authTeacher, isTeacher, questionController.createQuestions); //! create question

questionRoute.route("/").get(questionController.getAllQuestions);

questionRoute.route("/:id").get(questionController.getSingleQuestion); //! fetch singl question

module.exports = questionRoute;
