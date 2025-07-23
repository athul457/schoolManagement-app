const asyncHandler = require("express-async-handler");
const Teacher = require("../MODEL/STAFF/Teacher");
const jwt = require("jsonwebtoken");

const authTeacher = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Token Not Privided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRETE_ACCESS_KEY);
    const teacher = await Teacher.findById(decoded.user_id);
    if (!teacher) {
      res.status(404);
      throw new Error("Teacher not Found");
    }

    req.user = {
      user_id: decoded.user_id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    res.status(400);
    throw new Error(
      "Invalid token or expired token or you are not and Teacher"
    );
  }
});

module.exports = authTeacher;
