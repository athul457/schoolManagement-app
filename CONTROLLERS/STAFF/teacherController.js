const asyncHandler = require("express-async-handler");
const Teacher = require("../../MODEL/STAFF/Teacher");

exports.registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name email password are reyuired");
  }

  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    res.status(400);
    throw new Error("teacher already registerd");
  }

  const newTeacher = await Teacher.create({
    name,
    email,
    password,
    createdBy: req.user.user_id,
  });

  res.status(200).json({
    status: "ok",
    message: "Teacher created successfully",
    newTeacher,
  });
});

// ! Login Teacher

exports.loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password required for login");
  }

  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  const isMatch = await teacher.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("password is not matching");
  }

  const token = teacher.generateToken();

  res.status(200).json({
    status: "ok",
    message: "teacher Login successfully",
    token,
  });
});

// ! fetch all teachers

exports.getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().select("-password");
  res.status(200).json({
    status: "ok",
    message: "All Teacher Data Fetched Successfully",
    data: teachers,
  });
});
