const db = require("../../models");

const { createdAtUpdatedAt } = require("../utils");

const queryHelper = async (
  model,
  query,
  raw = false,
  attribute = "dataValues"
) => {
  try {
    const queryResult = await db[model].findOne(query);

    if (raw) return queryResult;

    const _attribute = queryResult[attribute];

    return _attribute;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const checkEmptyPassword = password => {
  if (password === "") return true;

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
  queryHelper,
  checkEmptyPassword,
  transformUser,
  checkEmail
};
