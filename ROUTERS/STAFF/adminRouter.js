const express = require("express");
const adminRoute = express.Router();
const adminController = require("../../CONTROLLERS/STAFF/adminController");
const authAdmin = require("../../MIDDLEWARES/authAdmin");
const isAdmin = require("../../MIDDLEWARES/isAdmin");

adminRoute.route("/register").post(adminController.staffRegister);
adminRoute.route("/login").post(adminController.staffLogin);
adminRoute.route("/").get(authAdmin, isAdmin, adminController.getAllStaffs);
adminRoute.route("/profile/:id").get(authAdmin, adminController.getSingleStaff);
adminRoute
  .route("/admins/:id")
  .get(authAdmin, isAdmin, adminController.getSingleStaffAdmin);
adminRoute.route("/profile/:id").patch(authAdmin, adminController.updateStaff);
adminRoute
  .route("/suspend/teacher/:id")
  .patch(authAdmin, adminController.suspendStaff);
adminRoute
  .route("/unsuspend/teacher/:id")
  .patch(authAdmin, adminController.unSuspendStaff);
adminRoute.route("/widraw/teacher/:id").patch(adminController.wirawStaff);
adminRoute.route("/unwidraw/teacher/:id").patch(adminController.unWidrawStaff);
adminRoute.route("/publish/exam/:id").patch(adminController.publishExam);
adminRoute.route("/unpublish/exam/:id").patch(adminController.unPublishExam);
adminRoute.route("/:id").delete(authAdmin, adminController.deleteStaff);

module.exports = adminRoute;
