const express = require("express");
const classRouter = express.Router();
const classLevelControllers = require("../../CONTROLLERS/ACCADEMIC/classLevelControllers");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

classRouter
  .route("/")
  .post(authAdmin, isAdmin, classLevelControllers.createClassLevel)
  .get(authAdmin, isAdmin, classLevelControllers.getAllClassLevel);

classRouter
  .route("/:id")
  .get(authAdmin, isAdmin, classLevelControllers.getSingleClassLevel)
  .patch(authAdmin, isAdmin, classLevelControllers.updateClassLevel)
  .delete(authAdmin, isAdmin, classLevelControllers.deleteClassLevel);

module.exports = classRouter;
