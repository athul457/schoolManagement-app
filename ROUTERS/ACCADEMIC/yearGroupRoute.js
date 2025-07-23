const express = require("express");
const yearGroupRoute = express.Router();
const yearGroupControllers = require("../../CONTROLLERS/ACCADEMIC/yearGroupController");
const isAdmin = require("../../MIDDLEWARES/isAdmin");
const authAdmin = require("../../MIDDLEWARES/authAdmin");

yearGroupRoute
  .route("/")
  .get(authAdmin, isAdmin, yearGroupControllers.getAllYearGroup)
  .post(authAdmin, isAdmin, yearGroupControllers.createYearGroup);

yearGroupRoute
  .route("/:id")
  .get(authAdmin, isAdmin, yearGroupControllers.getSingleYearGroup)
  .patch(authAdmin, isAdmin, yearGroupControllers.updateYearGroup)
  .delete(authAdmin, isAdmin, yearGroupControllers.deleteYearGroup);

module.exports = yearGroupRoute;
