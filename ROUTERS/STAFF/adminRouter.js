const express = require("express");
const adminRoute = express.Router();
const staffController = require("../../CONTROLLERS/STAFF/staffController");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

adminRoute.route("/register").post(staffController.staffRegister);
adminRoute.route("/login").post(staffController.staffLogin);
adminRoute.route("/").get(authAdmin, isAdmin, staffController.getAllStaffs);
adminRoute.route("/profile/:id").get(authAdmin, staffController.getSingleStaff);
adminRoute
  .route("/admins/:id")
  .get(authAdmin, isAdmin, staffController.getSingleStaffAdmin);
adminRoute.route("/profile/:id").patch(authAdmin, staffController.updateStaff);
adminRoute
  .route("/suspend/teacher/:id")
  .patch(authAdmin, staffController.suspendStaff);
adminRoute
  .route("/unsuspend/teacher/:id")
  .patch(authAdmin, staffController.unSuspendStaff);
adminRoute.route("/widraw/teacher/:id").patch(staffController.wirawStaff);
adminRoute.route("/unwidraw/teacher/:id").patch(staffController.unWidrawStaff);
adminRoute.route("/publish/exam/:id").patch(staffController.publishExam);
adminRoute.route("/unpublish/exam/:id").patch(staffController.unPublishExam);
adminRoute.route("/:id").delete(authAdmin, staffController.deleteStaff);

module.exports = adminRoute;
