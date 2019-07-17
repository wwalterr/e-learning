const errorName = {
  conflict: "conflict",
  internal: "internal",
  notFound: "notFound",
  badRequest: "badRequest"
};

const errorType = {
  conflict: {
    message: "current request has conflict with data in the database",
    statusCode: 409
  },
  internal: {
    message: "internal error, something unexpected happened",
    statusCode: 500
  },
  notFound: {
    message: "resource not found",
    statusCode: 404
  },
  badRequest: {
    message: "the server couldn't process the request, check a precondition or the access level",
    statusCode: 400
  }
};

module.exports = {
  errorName,
  errorType
};
