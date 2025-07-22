const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../MODEL/STAFF/Admin");

const authAdmin = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("No Token Provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRETE_ACCESS_KEY);
    const admin = await Admin.findById(decoded.user_id).select("-password");

    if (!admin) {
      res.status(404);
      throw new Error("admin not found");
    }

    req.user = {
      user_id: decoded.user_id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401);
    throw new Error("Invalid token or expired token or you are not and admin");
  }
});

module.exports = authAdmin;
