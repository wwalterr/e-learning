const db = require("../../models");

const { checkError, checkAuthentication } = require("../utils");

const userScopes = require("./scopes");

const searchUser = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.searchUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const user = await userHelper({ where: { id: args.id } });

    if (!user) throw "not found";

    const creator = await userHelper({ where: { id: user.creator } });

    return objectFilter(user, transformUser(user, creator));
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

module.exports = {};
