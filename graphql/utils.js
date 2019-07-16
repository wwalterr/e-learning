const { errorName } = require("./constants");

module.exports.checkError = errorType => {
  switch (errorType) {
    case "unique violation": // conflict
      throw new Error(errorName.conflict);
    default:
      throw new Error(errorName.internal);
  }
};
