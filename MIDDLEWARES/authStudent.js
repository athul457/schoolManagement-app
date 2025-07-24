const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Student = require("../MODEL/ACCADEMIC/Student");

const authStudent = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(400);
    throw new Error("Token Not Provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRETE_ACCESS_KEY);
    const student = await Student.findById(decoded.user_id).select("-password");
    if (!student) {
      res.status(404);
      throw new Error("student nor found");
    }
    req.user = {
      student_name: decoded.name,
      user_id: decoded.user_id,
      email: decoded.email,
      role: decoded.role,
    };
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400);
    throw new Error("Invalid Token Provided");
  }
});

module.exports = authStudent;
