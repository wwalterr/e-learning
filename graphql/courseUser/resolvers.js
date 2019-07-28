const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter,
  createdAtUpdatedAt
} = require("../utils");

const courseUserScopes = require("./scopes");

const createCourseUser = async (args, req) => {
  try {
    checkAuthentication(req, courseUserScopes.createCourseUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const course = await queryHelper("course", {
      where: { id: args.courseId }
    });

    if (!course) throw "not found";

    const user = await queryHelper("user", { where: { id: args.userId } });

    if (!user) throw "not found";

    try {
      const courseUser = await db.courseUser.create({ ...args });
    } catch (error) {
      throw "unique violation";
    }

    return "user and course associated";
  } catch (error) {
    checkError(error);
  }
};

const removeCourseUser = async (args, req) => {
  try {
    checkAuthentication(req, courseUserScopes.removeCourseUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const courseUserRemoved = await db.courseUser.destroy({
      where: { userId: args.userId, courseId: args.courseId },
      limit: 1
    });

    if (!courseUserRemoved) throw "not found";

    return "course user removed";
  } catch (error) {
    checkError(error);
  }
};

const listCourseUsers = async (args, req) => {
  try {
    checkAuthentication(req, courseUserScopes.listCourseUsers.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const courseUsers = Object.keys(args).length
      ? await db.courseUser.findAll({ where: { ...args } })
      : await db.courseUser.findAll();

    if (!courseUsers.length) throw "not found";

    return courseUsers.map(courseUser => {
      return objectFilter(
        courseUser.dataValues,
        createdAtUpdatedAt(courseUser.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createCourseUser,
  removeCourseUser,
  listCourseUsers
};
