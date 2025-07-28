const asyncHandler = require("express-async-handler");
const Exam = require("../../MODEL/ACCADEMIC/Exam");
const Teacher = require("../../MODEL/STAFF/Teacher");
const { path } = require("../../app");

// ! create exam
exports.createExam = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    passMark,
    totalMark,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    academicYear,
    classLevel,
  } = req.body;

  const requiredFeilds = [
    "name",
    "description",
    "subject",
    "program",
    "passMark",
    "totalMark",
    "academicTerm",
    "duration",
    "examDate",
    "examTime",
    "examType",
    "examStatus",
    "academicYear",
    "classLevel",
  ];

  for (const feilds of requiredFeilds) {
    if (!req.body[feilds]) {
      res.status(400);
      throw new Error(`${feilds} is required`);
    }
  }
  const teacher = await Teacher.findById(req.user.user_id);
  if (!teacher) {
    res.status(400);
    throw new Error("Teacher not found");
  }
  if (teacher.isSuspended || teacher.isWitdrawn) {
    res.status(400);
    throw new Error("access denied : teacher is suspended or withDrawn");
  }
  const exam = await Exam.findOne({ name });
  if (exam) {
    res.status(400);
    throw new Error("Exam Already Created");
  }
  const newExam = await Exam.create({
    name,
    description,
    subject,
    program,
    passMark,
    totalMark,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    academicYear,
    classLevel,
    createdBy: req.user.user_id,
  });

  teacher.examsCreated = teacher.examsCreated || [];
  teacher.examsCreated.push(newExam._id);
  await teacher.save();
  res.status(200).json({
    status: "ok",
    message: "exam created succeccfully",
    newExam,
  });
});

// ! get all exam

exports.getAllExam = asyncHandler(async (req, res) => {
  const exam = await Exam.find().populate({
    path: "questions",
    populate: {
      path: "createdBy",
    },
  });
  res.status(200).json({
    status: "ok",
    message: "all exam fetched succeccfully",
    exam,
  });
});
// ! get singl exam
exports.getSingleExam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const exam = await Exam.findById(id);
  if (!exam) {
    res.status(400);
    throw new Error("Exam Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "single exam fetched succeccfully",
    exam,
  });
});

// ! update exam
exports.updateExam = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    passMark,
    totalMark,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    academicYear,
    classLevel,
  } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const exam = await Exam.findById(id);
  if (!exam) {
    res.status(400);
    throw new Error("Exam Not Found");
  }
  if (name) exam.name = name;
  if (description) exam.description = description;
  if (subject) exam.subject = subject;
  if (program) exam.program = program;
  if (passMark) exam.passMark = passMark;
  if (totalMark) exam.totalMark = totalMark;
  if (academicTerm) exam.academicTerm = academicTerm;
  if (duration) exam.duration = duration;
  if (examDate) exam.examDate = examDate;
  if (examTime) exam.examTime = examTime;
  if (examType) exam.examType = examType;
  if (examStatus) exam.examStatus = examStatus;
  if (academicYear) exam.academicYear = academicYear;
  if (classLevel) exam.classLevel = classLevel;

  const updatedExam = await exam.save();
  res.status(200).json({
    status: "ok",
    message: "exam updated succeccfully",
    updatedExam,
  });
});
