const asyncHandler = require("express-async-handler");
const Subject = require("../../MODEL/ACCADEMIC/Subject");
const Admin = require("../../MODEL/STAFF/Admin");

// create subject
exports.createSubject = asyncHandler(async (req, res) => {
  const { name, description, duration, academicTerm } = req.body;
  if (!name || !description || !duration || !academicTerm) {
    res.status(400);
    throw new Error("name description duration academicTerm are required ");
  }

  const subject = await Subject.findOne({ name });
  if (subject) {
    res.status(400);
    throw new Error("subject already found");
  }

  const newSubject = await Subject.create({
    name,
    duration,
    description,
    academicTerm,
    createdBy: req.user.user_id,
  });

  res.status(200).json({
    status: "ok",
    message: "subject created successfully",
    newSubject,
  });
});

// get all subject
exports.getAllSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.find();
  res.status(200).json({
    status: "ok",
    message: "all subject Fetched successfully",
    subject,
  });
});

// get a subject
exports.getSingleSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }

  const subject = await Subject.findById(id);
  if (!subject) {
    res.status(404);
    throw new Error("subject not found");
  }

  res.status(200).json({
    status: "ok",
    message: "single subject Fetched successfully",
    subject,
  });
});

// update subject
exports.updateSubject = asyncHandler(async (req, res) => {
  const { name, description, duration, academicTerm } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }
  const subject = await Subject.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("cannot find the subject");
  }

  if (name) subject.name = name;
  if (description) subject.description = description;
  if (duration) subject.duration = duration;
  if (academicTerm) subject.academicTerm = academicTerm;

  const updatedSubject = await subject.save();
  res.status(200).json({
    status: "ok",
    message: "subject updated successfully",
    updatedSubject,
  });
});

// delete subject
exports.deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }
  const subject = await Subject.findById(id);
  if (!subject) {
    res.status(400);
    throw new Error("cannot find the subject");
  }
  res.status(200).json({
    status: "ok",
    message: "subject deleted successfully",
    name: `${subject.name}`,
  });
});
