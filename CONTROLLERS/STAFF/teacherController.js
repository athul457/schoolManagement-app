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
  const teachers = await Teacher.find()
    .select("-password")
    .populate("examsCreated")
    .populate("academicTerm")
    .populate("classLevel")
    .populate("academicYear");

  res.status(200).json({
    status: "ok",
    message: "All Teacher Data Fetched Successfully",
    data: teachers,
  });
});

// ! fetch single teacher

exports.getSingleTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const teacher = await Teacher.findById(id)
    .select("-password")
    .populate("examsCreated");

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "Teacher Data Fetched Successfully",
    teacher,
  });
});

// ! teacher can show teacher details only

exports.getOnlyTeacherData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "Teacher Fetched teacher data Successfully",
    teacher,
  });
});

// ! Teacher update profile

exports.updateTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher Not Found");
  }

  if (name) {
    teacher.name = name;
  }
  if (email) {
    teacher.email = email;
  }
  if (password) {
    teacher.password = password;
  }

  const updatedTeacher = await teacher.save();

  res.status(200).json({
    status: "ok",
    message: "Teacher data updated",
    updatedTeacher,
  });
});

// ! admin update teacher

exports.adminUpdateTeacher = asyncHandler(async (req, res) => {
  const {
    program,
    classLevel,
    academicYear,
    academicTerm,
    subject,
    isSuspended,
    isWitdrawn,
  } = req.body;

  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher Not Found");
  }

  if (program) teacher.program = program;
  if (subject) teacher.subject = subject;
  if (academicTerm) teacher.academicTerm = academicTerm;
  if (academicYear) teacher.academicYear = academicYear;
  if (classLevel) teacher.classLevel = classLevel;
  if (typeof isSuspended === "boolean") {
    if (isSuspended) teacher.isSuspended = isSuspended;
  }
  if (typeof isWitdrawn === "boolean") {
    if (isWitdrawn) teacher.isWitdrawn = isWitdrawn;
  }

  const updatedTeacher = await teacher.save();
  res.status(201).json({
    status: "ok",
    message: "admin updated teacher",
    data: {
      program: updatedTeacher.program,
      subject: updatedTeacher.subject,
      classLevel: updatedTeacher.classLevel,
      academicYear: updatedTeacher.academicYear,
      academicTerm: updatedTeacher.academicTerm,
      withDraw: updatedTeacher.isWitdrawn,
      Suspended: updatedTeacher.isSuspended,
    },
  });
});
