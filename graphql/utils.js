const { errorName } = require("./constants");

const checkError = errorType => {
  switch (errorType) {
    case "unique violation":
      throw new Error(errorName.conflict);

      break;

    case "not found":
      throw new Error(errorName.notFound);

      break;

    case "bad request":
      throw new Error(errorName.badRequest);

      break;

    default:
      throw new Error(errorName.internal);
  }
};

const checkEmptyPassword = password => {
  if (password === "") return true;

  return false;
};

const formatDate = date => {
  return new Date(date).toISOString();
};

const createdAtUpdatedAt = args => {
  if ("createdAt" in args && "updatedAt" in args) {
    return {
      createdAt: formatDate(args.createdAt),
      updatedAt: formatDate(args.updatedAt)
    };
  }

  return { createdAt: "", updatedAt: "" };
};

const objectFilter = (args, filter) => {
  return Object.assign({}, args, filter);
};

module.exports = {
  checkError,
  checkEmptyPassword,
  formatDate,
  createdAtUpdatedAt,
  objectFilter
};
