const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied: Admins only");
  }
  next();
});

module.exports = isAdmin;
