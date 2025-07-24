const express = require("express");
const app = express();
const morgan = require("morgan");
const errorHandler = require("./MIDDLEWARES/errorHandler");
app.use(morgan("dev"));
app.use(express.json());
const adminRoute = require("./ROUTERS/STAFF/adminRouter");
const accademicRoute = require("./ROUTERS/ACCADEMIC/accademicYearRouter");
const accademicTermsRoute = require("./ROUTERS/ACCADEMIC/accademicTermsRouter");
const classRouter = require("./ROUTERS/ACCADEMIC/classLevelRouters");
const programRoute = require("./ROUTERS/ACCADEMIC/programRouter");
const subjectRoute = require("./ROUTERS/ACCADEMIC/subjectRoute");
const yearGroupRoute = require("./ROUTERS/ACCADEMIC/yearGroupRoute");
const teacherRoute = require("./ROUTERS/STAFF/teacherRoute");
const examRoute = require("./ROUTERS/ACCADEMIC/examRouter");
const studentRoute = require("./ROUTERS/STUDENT/studentRoute");

// STAFF
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/admin", teacherRoute);

// academic
app.use("/api/v1/academic", accademicRoute);
app.use("/api/v1/terms", accademicTermsRoute);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/program", programRoute);
app.use("/api/v1/subject", subjectRoute);
app.use("/api/v1/year", yearGroupRoute);
app.use("/api/v1/teacher", examRoute);
app.use("/api/v1/admin", studentRoute);

app.use(errorHandler);
module.exports = app;
