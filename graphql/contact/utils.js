const { createdAtUpdatedAt } = require("../utils");

const transformContact = contact => {
  return {
    userId: null,
    ...createdAtUpdatedAt(contact)
  };
};

module.exports = {
  transformContact
};
