const express = require("express");
const app = express();
const morgan = require("morgan");
const errorHandler = require("./MIDDLEWARES/errorHandler");
app.use(morgan("dev"));
app.use(express.json());
const staffRoute = require("./ROUTERS/STAFF/staffRoute");
const accademicRoute = require("./ROUTERS/ACCADEMIC/accademicYearRouter");

app.use("/api/v1/admin", staffRoute);
app.use("/api/v1/academic", accademicRoute);
app.use(errorHandler);
module.exports = app;
