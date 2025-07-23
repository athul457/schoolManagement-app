const asyncHandler = require("express-async-handler");
const isTeacher = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.role === "teacher") {
    res.status(400);
    throw new Error("Access denied: only Teacher");
  }
  next();
});

module.exports = isTeacher;
