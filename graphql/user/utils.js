const db = require("../../models");

const userHelper = async (query, raw = false, attribute = "dataValues") => {
  try {
    const user = await db.user.findOne(query);

    if (raw) return user;

    return user[attribute];
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  userHelper
};
