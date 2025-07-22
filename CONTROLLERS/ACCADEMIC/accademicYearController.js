const asyncHandler = require("express-async-handler");
const AcademicYear = require("../../MODEL/ACCADEMIC/AcademicYear");
const Admin = require("../../MODEL/STAFF/Admin");

// create accademic calander
exports.createAcademicYear = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  if (!name || !fromYear || !toYear) {
    res.status(400);
    throw new Error(
      "name  fromYear  !toYear  createdBy all feilds are required"
    );
  }

  const existsCalander = await AcademicYear.findOne({ name });
  if (existsCalander) {
    res.status(400);
    throw new Error("Calender Already Exists");
  }

  const calander = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.user.user_id,
  });

  const admin = await Admin.findById(req.user.user_id);
  admin.academicYears = admin.academicYears || [];
  admin.academicYears.push(calander._id);
  await admin.save();
  res.status(201).json({
    status: "ok",
    message: "accademic year created",
    calander,
  });
});

// get all accademic Calander

exports.getAllAcademicYear = asyncHandler(async (req, res) => {
  const calander = await AcademicYear.find().select("-createdBy");
  res.status(200).json({
    status: "ok",
    message: "Fetched All Calander",
    calander,
  });
});

// get single accademic Calander
exports.getSingleAcademicYear = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("please enter id");
  }

  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("Access denied : only admins can access single calender");
  }
  const calander = await AcademicYear.findById(id);
  if (!calander) {
    res.status(400);
    throw new Error("cannot find the accademic year");
  }

  res.status(200).json({
    status: "ok",
    message: "get single academic year",
    calander,
  });
});

// update accademic calander
exports.updateAcademicYear = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, fromYear, toYear, isCurrent } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("please enter id");
  }
  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("Access denied : only admins");
  }

  const calanderExist = await AcademicYear.findById(id);
  if (!calanderExist) {
    res.status(400);
    throw new Error("calender not exist");
  }

  if (name) calanderExist.name = name;
  if (fromYear) calanderExist.fromYear = fromYear;
  if (toYear) calanderExist.toYear = toYear;
  if (typeof isCurrent === "boolean") {
    if (isCurrent) {
      await AcademicYear.updateMany({}, { isCurrent: false });
    }
    calanderExist.isCurrent = isCurrent;
  }

  const calender = await calanderExist.save();
  res.status(200).json({
    status: "ok",
    message: "accademic year updated",
    calender,
  });
});

// ! delete calander
exports.deleteAcademicYear = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Please provide a valid Accademic Year ID");
  }
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied: only admins can delete accademic years");
  }

  const calander = await AcademicYear.findById(id);
  if (!calander) {
    res.status(404);
    throw new Error("Accademic year not found");
  }

  if (calander.isCurrent === true) {
    res.status(400);
    throw new Error("Cannot delete the current accademic year");
  }

  await calander.deleteOne();
  res.status(200).json({
    status: "ok",
    message: "Accademic year successfully deleted",
    name: `${calander.name}`,
  });
});
