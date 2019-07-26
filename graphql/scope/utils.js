const { createdAtUpdatedAt } = require("../utils");

const transformScope = scope => {
  return {
    id: null,
    ...createdAtUpdatedAt(scope)
  };
};

module.exports = {
  transformScope
};
