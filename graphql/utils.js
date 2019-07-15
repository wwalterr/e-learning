const { errorName } = require("./constants");

module.exports.checkError = errorType => {
  switch (errorType) {
    case "unique violation":
      throw new Error(errorName.conflict);
    default:
      throw new Error(errorName.internal);
  }
};
