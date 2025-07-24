const asyncHandler = require("express-async-handler");

const isStudent = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "students") {
    res.status(400);
    throw new Error("Access denied: Only students");
  }
  next();
});

module.exports = isStudent;
