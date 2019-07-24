const { errorName } = require("./constants");

const checkError = errorType => {
  switch (errorType) {
    case "unique violation":
      throw new Error(errorName.conflict);

    case "not found":
      throw new Error(errorName.notFound);

    case "bad request":
      throw new Error(errorName.badRequest);

    case "unauthorized":
      throw new Error(errorName.unauthorized);

    default:
      throw new Error(errorName.internal);
  }
};

const formatDate = date => {
  return new Date(date).toISOString();
};

const createdAtUpdatedAt = args => {
  if ("createdAt" in args && "updatedAt" in args)
    return {
      createdAt: formatDate(args.createdAt),
      updatedAt: formatDate(args.updatedAt)
    };

  return { createdAt: "", updatedAt: "" };
};

const objectFilter = (args, filter) => {
  if (!Object.keys(args).length) return {};

  return Object.assign({}, args, filter);
};

module.exports = {
  checkError,
  formatDate,
  createdAtUpdatedAt,
  objectFilter
};
