const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter
} = require("../utils");

const { transformScope } = require("./utils");

const scopeScopes = require("./scopes");

const searchScope = async (args, req) => {
  try {
    checkAuthentication(req, scopeScopes.searchScope.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const scope = await queryHelper("scope", { where: { name: args.name } });

    if (!scope) throw "not found";

    return objectFilter(scope, transformScope(scope));
  } catch (error) {
    checkError(error);
  }
};

const createScope = async (args, req) => {
  try {
    checkAuthentication(req, scopeScopes.createScope.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const scope = {
      name: args.params.name,
      description: args.params.description
    };

    let scopeCreated = {};

    try {
      scopeCreated = await db.scope.create(scope);
    } catch (error) {
      throw "unique violation";
    }

    return objectFilter(scopeCreated.dataValues, transformScope(scopeCreated.dataValues));
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  searchScope,
  createScope
};
