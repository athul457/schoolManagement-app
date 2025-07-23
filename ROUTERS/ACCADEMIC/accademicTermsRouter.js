const express = require("express");
const accademicTermsRoute = express.Router();
const academicTerms = require("../../CONTROLLERS/ACCADEMIC/accademicTermsController");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

accademicTermsRoute
  .route("/")
  .get(authAdmin, isAdmin, academicTerms.getAllAccademicTerm)
  .post(authAdmin, academicTerms.createAccademicTerm);

accademicTermsRoute
  .route("/:id")
  .get(authAdmin, isAdmin, academicTerms.getSingleAccademicTerm)
  .patch(authAdmin, isAdmin, academicTerms.updateAccademicTerm)
  .delete(authAdmin, isAdmin, academicTerms.deleteAccademicTerm);

module.exports = accademicTermsRoute;
