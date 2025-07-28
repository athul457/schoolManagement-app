const asyncHandler = require("express-async-handler");
const Student = require("../../MODEL/ACCADEMIC/Student");
const Exam = require("../../MODEL/ACCADEMIC/Exam");

// ! student register

exports.createStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name email password are required");
  }

  const student = await Student.findOne({ email });
  if (student) {
    res.status(400);
    throw new Error("user alredy found");
  }

  const newStudent = await Student.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    status: "ok",
    message: "student created successfully",
    newStudent,
  });
});

// ! student login

exports.loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required to login");
  }

  const student = await Student.findOne({ email });
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  const isMatch = await student.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("password miss match");
  }

  const token = student.generateToken();

  res.status(200).json({
    status: "ok",
    message: "student login successfully",
    token,
  });
});

// ! get all students
exports.getAllStudent = asyncHandler(async (req, res) => {
  const student = await Student.find();
  res.status(200).json({
    status: "ok",
    message: "all student fetched successfully",
    student,
  });
});
exports.getSingleStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id required");
  }

  const student = await Student.findById(id).select("-password");
  if (!student) {
    res.status(404);
    throw new Error("Student Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "a student fetched successfully",
    student,
  });
});

// ! student fetch student own data

exports.StudentGetStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id required");
  }

  const student = await Student.findById(id).select("-password");
  if (!student) {
    res.status(404);
    throw new Error("Student Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "a student fetched successfully",
    student,
  });
});

// ! update student
exports.updateStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id reqyuired");
  }
  const student = await Student.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("User Not Found");
  }

  if (name) student.name = name;
  if (email) student.email = email;
  if (password) student.password = password;

  const updatedStudent = await student.save();
  res.status(200).json({
    status: "ok",
    message: "student updated successfully ",
    updatedStudent,
  });
});

// ! admin assign values

exports.adminAssignStudent = asyncHandler(async (req, res) => {
  const { classLevels, academicYear, dateAdmitted, program } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id reqyuired");
  }
  const student = await Student.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("User Not Found");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    {
      $set: { dateAdmitted },
      $addToSet: { classLevels, academicYear, program },
    },
    { new: true }
  );
  res.status(200).json({
    status: "ok",
    message: "student updated successfully ",
    updatedStudent,
  });
});

// ! student write exam
exports.writeExam = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user.user_id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  const exam = await Exam.findById(req.params.id).populate("questions");
  if (!exam) {
    res.status(404);
    throw new Error("exam not found");
  }
  //  get questions
  const questions = exam.questions;
  // get answers
  const studentAnswers = req.body.answers;
  if (studentAnswers.length !== questions.length) {
    res.status(400);
    throw new Error("You are not answerd all questions");
  }

  let correctAnswer = 0;
  let score = 0;
  let wrongAnsers = 0;
  let grade = 0;
  let totalQuestions = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    totalQuestions = questions.length;
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswer++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnsers++;
    }
  }

  res.status(200).json({
    status: "writing exam",
    totalQuestions,
    questions,
    correctAnswer,
    wrongAnsers,
    score,
  });
});
