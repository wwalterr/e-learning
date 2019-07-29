const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter,
  createdAtUpdatedAt
} = require("../utils");

const classUserScopes = require("./scopes");

const createClassUser = async (args, req) => {
  try {
    checkAuthentication(req, classUserScopes.createClassUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const _class = await queryHelper("class", { where: { id: args.classId } });

    if (!_class) throw "not found";

    const user = await queryHelper("user", { where: { id: args.userId } });

    if (!user) throw "not found";

    try {
      const classUser = await db.classUser.create({ ...args });
    } catch (error) {
      throw "unique violation";
    }

    return "user and class associated";
  } catch (error) {
    checkError(error);
  }
};

const removeClassUser = async (args, req) => {
  try {
    checkAuthentication(req, classUserScopes.removeClassUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const classUserRemoved = await db.classUser.destroy({
      where: { ...args },
      limit: 1
    });

    if (!classUserRemoved) throw "not found";

    return "class user removed";
  } catch (error) {
    checkError(error);
  }
};

const listClassUsers = async (args, req) => {
  try {
    checkAuthentication(req, classUserScopes.listClassUsers.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const classUsers = Object.keys(args).length
      ? await db.classUser.findAll({ where: { ...args } })
      : await db.classUser.findAll();

    if (!classUsers.length) throw "not found";

    return classUsers.map(classUser => {
      return objectFilter(
        classUser.dataValues,
        createdAtUpdatedAt(classUser.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createClassUser,
  removeClassUser,
  listClassUsers
};
