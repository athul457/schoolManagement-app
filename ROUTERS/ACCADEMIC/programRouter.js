const express = require("express");
const programRoute = express.Router();
const programController = require("../../CONTROLLERS/ACCADEMIC/programControllers");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

programRoute
  .route("/")
  .post(authAdmin, isAdmin, programController.createProgram)
  .get(authAdmin, isAdmin, programController.getAllProgram);

programRoute
  .route("/:id")
  .get(authAdmin, isAdmin, programController.getSingleProgram)
  .patch(authAdmin, isAdmin, programController.updateProgram)
  .delete(authAdmin, isAdmin, programController.deleteProgram);

module.exports = programRoute;
