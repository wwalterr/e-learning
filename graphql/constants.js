module.exports.errorName = {
  conflict: "conflict",
  internal: "internal",
  notFound: "notFound"
};

module.exports.errorType = {
  conflict: {
    message: "current request has conflict (s) with data in the database",
    statusCode: 409
  },
  internal: {
    message: "internal error, something unexpected happened",
    statusCode: 500
  },
  notFound: {
    message: "resource not found",
    statusCode: 404
  }
};
