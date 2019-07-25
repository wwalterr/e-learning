const db = require("../../models");

const { checkError, checkAuthentication } = require("../utils");

const scopeScopes = require("./scopes");

const searchScope = async (args, req) => {
  try {
    checkAuthentication(req, scopeScopes.searchScope.name);
  } catch (error) {
    checkError(error);
  }

  try {
    return {
      id: 1,
      name: "",
      description: "",
      createdAt: "",
      updatedAt: ""
    };
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  searchScope
};
