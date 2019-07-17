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

module.exports = {
  checkError,
  checkEmptyPassword
};
