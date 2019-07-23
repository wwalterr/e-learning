const errorName = {
  conflict: "conflict",
  internal: "internal",
  notFound: "notFound",
  badRequest: "badRequest",
  unauthorized: "unauthorized"
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
    message:
      "the server couldn't process the request, check a precondition or the access level",
    statusCode: 400
  },
  unauthorized: {
    message: "unauthorized, the authentication credentials are not valid",
    statusCode: 401
  }
};

module.exports = {
  errorName,
  errorType
};
