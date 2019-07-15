module.exports.errorName = {
  conflict: "conflict",
  internal: "internal"
};

module.exports.errorType = {
  conflict: {
    message: "current request data has conflict (s) with data in the database",
    statusCode: 409
  },
  internal: {
    message: "internal error, something unexpected happened",
    statusCode: 500
  }
};
