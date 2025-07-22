const asyncHandler = require("express-async-handler");
const Admin = require("../../MODEL/STAFF/Admin");
const AcademicTerms = require("../../MODEL/ACCADEMIC/AcademicTerm");

// ! accademic term create
exports.createAccademicTerm = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  if (!name || !description || !duration) {
    res.status(400);
    throw new Error("name,description,duration all are required");
  }

  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("Access Denied : only admins");
  }
  const existTerm = await AcademicTerms.findOne({ name });
  if (existTerm) {
    res.status(400);
    throw new Error("Term already exist");
  }

  const academicTerm = await AcademicTerms.create({
    name,
    description,
    duration,
    createdBy: req.user.user_id,
  });

  const admin = await Admin.findById(req.user.user_id);
  admin.academicTerms = admin.academicTerms || [];
  admin.academicTerms.push(academicTerm._id);
  await admin.save();

  res.status(200).json({
    status: "ok",
    message: "created accademic term",
    academicTerm,
  });
});

// ! get all accademic term

exports.getAllAccademicTerm = asyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerms.find().select("-createdBy");
  res.status(200).json({
    status: "ok",
    message: "fetched all accademic term",
    academicTerm,
  });
});

// ! get single accademic term

exports.getSingleAccademicTerm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const accademicTerm = await AcademicTerms.findById(id);
  if (!accademicTerm) {
    res.status(404);
    throw new Error("Accademic Term Details Doest Exist");
  }

  res.status(200).json({
    status: "ok",
    message: "Fetched Single Accademic Term",
    accademicTerm,
  });
});

// ! update accademic term

exports.updateAccademicTerm = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const academicTerm = await AcademicTerms.findById(id);
  if (!academicTerm) {
    res.status(404);
    throw new Error("Accademic Term Doest exist");
  }

  if (name) academicTerm.name = name;
  if (description) academicTerm.description = description;
  if (duration) academicTerm.duration = duration;

  const newAccademicTerm = await academicTerm.save();

  res.status(200).json({
    status: "ok",
    message: "updated accademic term",
    newAccademicTerm,
  });
});

// ! delete accademic term

exports.deleteAccademicTerm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id Required");
  }

  const accademicTerm = await AcademicTerms.findById(id);
  if (!accademicTerm) {
    res.status(404);
    throw new Error("Accademic Term Doest exist");
  }

  await accademicTerm.deleteOne();

  res.status(200).json({
    status: "ok",
    message: "Accademic Term Deleted Successfully",
    name: `${accademicTerm.name}`,
  });
});
