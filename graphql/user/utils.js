const { createdAtUpdatedAt } = require("../utils");

const checkEmptyPassword = password => {
  if (!password || password === "") return true;

  return false;
};

const transformUser = (user, creator) => {
  return {
    password: null,
    creator,
    ...createdAtUpdatedAt(user)
  };
};

const checkEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = {
  checkEmptyPassword,
  transformUser,
  checkEmail
};
