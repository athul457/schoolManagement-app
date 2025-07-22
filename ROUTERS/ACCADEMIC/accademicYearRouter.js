const express = require("express");
const accademicRoute = express.Router();
const accademicYearController = require("../../CONTROLLERS/ACCADEMIC/accademicYearController");
const isAdmin = require("../../MIDDLEWARES/isAdmin");
const authAdmin = require("../../MIDDLEWARES/authAdmin");

accademicRoute
  .route("/")
  .get(authAdmin, accademicYearController.getAllAcademicYear);

accademicRoute
  .route("/year/:id")
  .get(authAdmin, isAdmin, accademicYearController.getSingleAcademicYear);

accademicRoute
  .route("/year")
  .post(authAdmin, isAdmin, accademicYearController.createAcademicYear);
accademicRoute
  .route("/year/:id")
  .patch(authAdmin, isAdmin, accademicYearController.updateAcademicYear);

accademicRoute
  .route("/year/:id")
  .delete(authAdmin, isAdmin, accademicYearController.deleteAcademicYear);

module.exports = accademicRoute;
