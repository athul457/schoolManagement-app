const asyncHandler = require("express-async-handler");
const Admin = require("../../MODEL/STAFF/Admin.js");

// ! register admin
exports.staffRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Email Name Password Needed");
  }

  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    res.status(400);
    throw new Error("Admin Already Exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    status: "ok",
    message: "admin created",
    admin: {
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// ! admin login
exports.staffLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error("User not found");
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Password is incorrect");
  }

  const token = admin.generateToken();

  res.status(200).json({
    message: "Login successful",
    token,
  });
});

// ! get all staff
exports.getAllStaffs = asyncHandler(async (req, res) => {
  const admin = await Admin.find()
    .select("-password")
    .populate("academicYears academicTerms");
  res.status(200).json({
    status: "ok",
    message: "data fetched successfully 😍😍😍😍😍😍😍",
    admin,
  });
});

// ! get single staff
exports.getSingleStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.user.user_id);
  console.log(id);
  if (req.user.user_id !== id) {
    res.status(400);
    throw new Error("You cannot access the data");
  }
  const admin = await Admin.findById(id).select("-password");
  res.status(200).json({
    status: "ok",
    message: "data fetched successfully",
    admin,
  });
});

// ! admin can view all single users data seperately
exports.getSingleStaffAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.user.user_id);
  console.log(id);
  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("You cannot access the data");
  }
  const admin = await Admin.findById(id).select("-password");
  res.status(200).json({
    status: "ok",
    message: "data fetched successfully",
    admin,
  });
});

// ! update staff

exports.updateStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Must Provide Id");
  }

  if (req.user.user_id !== id && req.user.role !== "admin") {
    res.status(400);
    throw new Error("you cannot modify the data");
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    res.status(404);
    throw new Error("user not found");
  }

  if (name) admin.name = name;
  if (email) admin.email = email;
  if (password) admin.password = password;
  if (role && req.user.role === "admin") {
    admin.role = role;
  }

  const updatedAdmin = await admin.save();
  res.status(200).json({
    status: "ok",
    message: "staff updated successfully",
    updatedAdmin: {
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    },
  });
});

// ! delete staff

exports.deleteStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id not found");
  }
  if (req.user.user_id !== id && req.user.role !== "admin") {
    res.status(400);
    throw new Error("you are not access to delete user");
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    res.status(400);
    throw new Error("user not found");
  }

  await admin.deleteOne();
  res.status(200).json({
    status: "ok",
    message: `user deleted successfully ${admin.name}`,
  });
});

exports.suspendStaff = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "staff suspended successfully",
  });
});
exports.unSuspendStaff = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "staff un-suspended successfully",
  });
});
exports.wirawStaff = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "staff withdraw successfully",
  });
});
exports.unWidrawStaff = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "staff un-withdraw successfully",
  });
});
exports.publishExam = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "published exam successfully",
  });
});
exports.unPublishExam = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "un published exam successfully",
  });
});
