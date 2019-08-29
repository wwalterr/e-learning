const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter,
  createdAtUpdatedAt
} = require("../utils");

const userScopeScopes = require("./scopes");

const createUserScope = async (args, req) => {
  try {
    checkAuthentication(req, userScopeScopes.createUserScope.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const scope = await queryHelper("scope", { where: { id: args.scopeId } });

    if (!scope) throw "not found";

    const user = await queryHelper("user", { where: { id: args.userId } });

    if (!user) throw "not found";

    try {
      const userScope = await db.userScope.create({ ...args });
    } catch (error) {
      throw "unique violation";
    }

    return "user and scope associated";
  } catch (error) {
    checkError(error);
  }
};

const createUserScopeBulk = async (args, req) => {
  try {
    checkAuthentication(req, userScopeScopes.createUserScopeBulk.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const scopes = args.scopesNames
      ? await db.scope.findAll({ where: { name: args.scopesNames } })
      : await db.scope.findAll({ where: { id: args.scopesIds } });

    if (!scopes.length) throw "not found";

    const scopesIds = scopes.map(scope => scope.dataValues.id);

    if (args.scopesNames && args.scopesNames.length != scopesIds.length)
      throw "unprocessable entity";

    if (args.scopesIds && args.scopesIds.length != scopesIds.length)
      throw "unprocessable entity";

    const user = await queryHelper("user", { where: { id: args.userId } });

    if (!user) throw "not found";

    try {
      const userScope = await db.userScope.bulkCreate(
        scopesIds.map(scopeId => ({
          scopeId,
          userId: user.id
        }))
      );
    } catch (error) {
      throw "unique violation";
    }

    return "user and scopes associated";
  } catch (error) {
    checkError(error);
  }
};

const removeUserScope = async (args, req) => {
  try {
    checkAuthentication(req, userScopeScopes.removeUserScope.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const userScopeRemoved = await db.userScope.destroy({
      where: { userId: args.userId, scopeId: args.scopeId },
      limit: 1
    });

    if (!userScopeRemoved) throw "not found";

    return "user scope removed";
  } catch (error) {
    checkError(error);
  }
};

const listUserScopes = async (args, req) => {
  try {
    checkAuthentication(req, userScopeScopes.listUserScopes.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const userScopes = Object.keys(args).length
      ? await db.userScope.findAll({ where: { ...args } })
      : await db.userScope.findAll();

    if (!userScopes.length) throw "not found";

    return userScopes.map(userScope => {
      return objectFilter(
        userScope.dataValues,
        createdAtUpdatedAt(userScope.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createUserScope,
  removeUserScope,
  listUserScopes,
  createUserScopeBulk
};
