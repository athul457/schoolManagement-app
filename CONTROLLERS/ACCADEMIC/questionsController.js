const asyncHandler = require("express-async-handler");
const Questions = require("../../MODEL/ACCADEMIC/Questions");
const Exam = require("../../MODEL/ACCADEMIC/Exam");

// ! create questions
exports.createQuestions = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  const requiredFields = [
    "question",
    "optionA",
    "optionB",
    "optionC",
    "optionD",
    "correctAnswer",
  ];

  for (const fields of requiredFields) {
    if (!req.body[fields]) {
      res.status(400);
      throw new Error(`${fields} is required`);
    }
  }

  const questions = await Questions.findOne({ question });
  if (questions) {
    res.status(400);
    throw new Error("question is Already exist");
  }

  const newQuestions = await Questions.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.user.user_id,
  });
  const exams = await Exam.findById(req.params.id);
  if (!exams) {
    res.status(400);
    throw new Error("exam not found");
  }

  exams.questions = exams.questions || [];
  exams.questions.push(newQuestions._id);
  await exams.save();

  res.status(201).json({
    status: "ok",
    message: "Question created succeccfully",
    newQuestions,
  });
});

// ! get all questions
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const question = await Questions.find();
  res.status(200).json({
    status: "ok",
    message: "all questions",
    question,
  });
});

// ! get a question
exports.getSingleQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const question = await Questions.findById(id);
  if (!question) {
    res.status(404);
    throw new Error("Question not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "a question fetched succeccfully",
    question,
  });
});
