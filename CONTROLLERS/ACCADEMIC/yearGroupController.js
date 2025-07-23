const asyncHandler = require("express-async-handler");
const YearGroups = require("../../MODEL/ACCADEMIC/YearGroup");
const Admin = require("../../MODEL/STAFF/Admin");

// create yearGroup
exports.createYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  if (!name || !academicYear) {
    res.status(400);
    throw new Error("name and  academicYear are required ");
  }

  const yearGroup = await YearGroups.findOne({ name });
  if (yearGroup) {
    res.status(400);
    throw new Error("year Group already found");
  }

  const newYearGroup = await YearGroups.create({
    name,
    academicYear,
    createdBy: req.user.user_id,
  });

  const admin = await Admin.findById(req.user.user_id);
  admin.yearGroups = admin.yearGroups || [];
  admin.yearGroups.push(newYearGroup._id);
  await admin.save();

  res.status(200).json({
    status: "ok",
    message: "yearGroup created successfully",
    newYearGroup,
  });
});

// get all yearGroup
exports.getAllYearGroup = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroups.find();
  res.status(200).json({
    status: "ok",
    message: "all year group Fetched successfully",
    yearGroup,
  });
});

// get a yearGroup
exports.getSingleYearGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }

  const yearGroup = await YearGroups.findById(id);
  if (!yearGroup) {
    res.status(404);
    throw new Error("year Group not found");
  }

  res.status(200).json({
    status: "ok",
    message: "single yearGroup Fetched successfully",
    yearGroup,
  });
});

// update yearGroup
exports.updateYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }
  const yearGroup = await YearGroups.findById(id);
  if (!yearGroup) {
    res.status(400);
    throw new Error("cannot find the year Group");
  }

  if (name) yearGroup.name = name;
  if (academicYear) yearGroup.academicYear = academicYear;

  const updatedYearGroup = await yearGroup.save();
  res.status(200).json({
    status: "ok",
    message: "year Group updated successfully",
    updatedYearGroup,
  });
});

// delete yearGroup
exports.deleteYearGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("id required");
  }
  const yearGroup = await YearGroups.findById(id);
  if (!yearGroup) {
    res.status(400);
    throw new Error("cannot find the year Group");
  }
  res.status(200).json({
    status: "ok",
    message: "year Group deleted successfully",
    name: `${yearGroup.name}`,
  });
});
