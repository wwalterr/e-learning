const errorName = {
  conflict: "conflict",
  internal: "internal",
  notFound: "notFound",
  badRequest: "badRequest",
  unauthorized: "unauthorized",
  noContent: "noContent",
  badGateway: "badGateway"
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
  },
  noContent: {
    message:
      "the server successfully processed the request, but is not returning any content",
    statusCode: 204
  },
  badGateway: {
    message: "the server received an invalid response from the upstream server",
    statusCode: 502
  }
};

module.exports = {
  errorName,
  errorType
};
