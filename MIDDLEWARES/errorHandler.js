const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "NOT_FOUND",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
      });

    default:
      res.status(statusCode).json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
