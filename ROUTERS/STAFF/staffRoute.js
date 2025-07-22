const express = require("express");
const staffRoute = express.Router();
const staffController = require("../../CONTROLLERS/STAFF/staffController");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

staffRoute.route("/register").post(staffController.staffRegister);
staffRoute.route("/login").post(staffController.staffLogin);
staffRoute.route("/").get(authAdmin, isAdmin, staffController.getAllStaffs);
staffRoute.route("/profile/:id").get(authAdmin, staffController.getSingleStaff);
staffRoute
  .route("/admins/:id")
  .get(authAdmin, isAdmin, staffController.getSingleStaffAdmin);
staffRoute.route("/profile/:id").patch(authAdmin, staffController.updateStaff);
staffRoute
  .route("/suspend/teacher/:id")
  .patch(authAdmin, staffController.suspendStaff);
staffRoute
  .route("/unsuspend/teacher/:id")
  .patch(authAdmin, staffController.unSuspendStaff);
staffRoute.route("/widraw/teacher/:id").patch(staffController.wirawStaff);
staffRoute.route("/unwidraw/teacher/:id").patch(staffController.unWidrawStaff);
staffRoute.route("/publish/exam/:id").patch(staffController.publishExam);
staffRoute.route("/unpublish/exam/:id").patch(staffController.unPublishExam);
staffRoute.route("/:id").delete(authAdmin, staffController.deleteStaff);

module.exports = staffRoute;
