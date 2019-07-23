const db = require("../../models");

const { createdAtUpdatedAt } = require("../utils");

const userHelper = async (query, raw = false, attribute = "dataValues") => {
  try {
    const user = await db.user.findOne(query);

    if (raw) {
      return user;
    }

    const _attribute = user[attribute];

    return _attribute;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const checkEmptyPassword = password => {
  if (password === "") {
    return true;
  }

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
  userHelper,
  checkEmptyPassword,
  transformUser,
  checkEmail
};
