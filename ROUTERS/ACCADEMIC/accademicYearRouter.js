const express = require("express");
const accademicRoute = express.Router();
const accademicYearController = require("../../CONTROLLERS/ACCADEMIC/accademicYearController");
const isAdmin = require("../../MIDDLEWARES/isAdmin");
const authAdmin = require("../../MIDDLEWARES/authAdmin");

accademicRoute
  .route("/year")
  .post(authAdmin, isAdmin, accademicYearController.createAcademicYear);
accademicRoute
  .route("/")
  .get(authAdmin, accademicYearController.getAllAcademicYear);

accademicRoute
  .route("/year/:id")
  .get(authAdmin, accademicYearController.getSingleAcademicYear)
  .delete(authAdmin, isAdmin, accademicYearController.deleteAcademicYear)
  .patch(authAdmin, isAdmin, accademicYearController.updateAcademicYear);

module.exports = accademicRoute;
