const express = require("express");
const subjectRoute = express.Router();
const subjectControllers = require("../../CONTROLLERS/ACCADEMIC/subjectControllers");
const adminAuth = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

subjectRoute
  .route("/")
  .post(adminAuth, isAdmin, subjectControllers.createSubject)
  .get(adminAuth, isAdmin, subjectControllers.getAllSubject);

subjectRoute
  .route("/:id")
  .get(adminAuth, isAdmin, subjectControllers.getSingleSubject)
  .patch(adminAuth, isAdmin, subjectControllers.updateSubject)
  .delete(adminAuth, isAdmin, subjectControllers.deleteSubject);

module.exports = subjectRoute;
