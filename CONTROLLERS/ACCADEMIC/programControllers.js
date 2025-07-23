const asyncHandler = require("express-async-handler");
const Admin = require("../../MODEL/STAFF/Admin");
const Program = require("../../MODEL/ACCADEMIC/Program");

// !create program
exports.createProgram = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  if (!name || !description || !duration) {
    res.status(400);
    throw new Error("name n description , duration are reuired");
  }

  const program = await Program.findOne({ name });
  if (program) {
    res.status(400);
    throw new Error(`can't create : program already exist`);
  }
  const newProgram = await Program.create({
    name,
    description,
    duration,
    createdBy: req.user.user_id,
  });

  const admin = await Admin.findById(req.user.user_id);
  admin.programs = admin.programs || [];
  admin.programs.push(newProgram._id);
  await admin.save();
  res.status(200).json({
    status: "ok",
    message: "Program created Successfully",
    newProgram,
  });
});

// ! get all program
exports.getAllProgram = asyncHandler(async (req, res) => {
  const program = await Program.find();
  res.status(200).json({
    status: "ok",
    message: "All Program Fetched Successfully",
    program,
  });
});

// ! get single program
exports.getSingleProgram = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id required");
  }

  const program = await Program.findById(id);
  if (!program) {
    res.status(404);
    throw new Error("Program Not Found");
  }

  res.status(200).json({
    status: "ok",
    message: "A Program Fetched Successfully",
    program,
  });
});

// ! update program
exports.updateProgram = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id required");
  }

  const program = await Program.findById(id);
  if (!program) {
    res.status(404);
    throw new Error("Program Not Found");
  }

  if (name) program.name = name;
  if (description) program.description = description;
  if (duration) program.duration = duration;

  const updatedProgram = await program.save();

  res.status(200).json({
    status: "ok",
    message: "Program updated Successfully",
    updatedProgram,
  });
});

//! delete program
exports.deleteProgram = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id required");
  }

  const program = await Program.findById(id);
  if (!program) {
    res.status(404);
    throw new Error("Program Not Found");
  }
  await program.deleteOne();
  res.status(200).json({
    status: "ok",
    message: "Program deleted Successfully",
  });
});
