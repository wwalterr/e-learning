const { createdAtUpdatedAt } = require("../utils");

const transformAddress = address => {
  return {
    userId: null,
    ...createdAtUpdatedAt(address)
  };
};

module.exports = {
  transformAddress
};
