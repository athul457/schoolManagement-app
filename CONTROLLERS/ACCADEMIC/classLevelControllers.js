const asyncHandler = require("express-async-handler");
const Admin = require("../../MODEL/STAFF/Admin");
const ClassLevel = require("../../MODEL/ACCADEMIC/ClassLevel");

// ! create class level
exports.createClassLevel = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("name is required");
  }

  const classLevel = await ClassLevel.findOne({ name });
  if (classLevel) {
    res.status(400);
    throw new Error("class already exist");
  }

  const newClass = await ClassLevel.create({
    name,
    description,
    createdBy: req.user.user_id,
  });

  const admin = await Admin.findById(req.user.user_id);
  admin.classLevels = admin.classLevels || [];
  admin.classLevels.push(newClass._id);
  await admin.save();

  res.status(200).json({
    status: "ok",
    message: "class level created Successfully",
    newClass,
  });
});

// ! display all class
exports.getAllClassLevel = asyncHandler(async (req, res) => {
  const getClass = await ClassLevel.find();
  res.status(200).json({
    status: "ok",
    message: "all class level fetched Successfully",
    getClass,
  });
});

// ! display single class
exports.getSingleClassLevel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error(" Id required ");
  }

  const classExist = await ClassLevel.findById(id);
  if (!classExist) {
    res.status(404);
    throw new Error("class level not exist");
  }
  res.status(200).json({
    status: "ok",
    message: "single class level fetched Successfully",
    classExist,
  });
});

// ! update class
exports.updateClassLevel = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error(" Id required ");
  }
  const classExist = await ClassLevel.findById(id);
  if (!classExist) {
    res.status(404);
    throw new Error("class level not exist");
  }

  if (name) classExist.name = name;
  if (description) classExist.description = description;

  const newClass = await classExist.save();

  res.status(200).json({
    status: "ok",
    message: "class level updated Successfully",
    newClass,
  });
});

// ! delete class

exports.deleteClassLevel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error(" Id required ");
  }
  const classExist = await ClassLevel.findById(id);
  if (!classExist) {
    res.status(404);
    throw new Error("class level not exist");
  }
  await classExist.deleteOne();
  res.status(200).json({
    status: "ok",
    message: "class level deleted Successfully",
  });
});
