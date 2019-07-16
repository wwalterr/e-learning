const { errorName } = require("./constants");

module.exports.checkError = errorType => {
  switch (errorType) {
    case "unique violation":
      throw new Error(errorName.conflict);
    case "not found":
      throw new Error(errorName.notFound);
    default:
      throw new Error(errorName.internal);
  }
};
