const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter,
  checkISODate
} = require("../utils");

const { transformCourse } = require("./utils");

const courseScopes = require("./scopes");

const createCourse = async (args, req) => {
  try {
    checkAuthentication(req, courseScopes.createCourse.name);
  } catch (error) {
    checkError(error);
  }

  try {
    if (!checkISODate(args.params.start) || !checkISODate(args.params.end))
      throw "bad request";
  } catch (error) {
    checkError(error);
  }

  try {
    const creator = await queryHelper("user", {
      where: { id: args.params.creator }
    });

    if (!creator) throw "not found";
  } catch (error) {
    checkError(error);
  }

  try {
    const course = {
      title: args.params.title,
      description: args.params.description,
      start: args.params.start,
      end: args.params.end,
      creator: args.params.creator,
      private: args.params.private
    };

    let courseCreated = await db.course.create(course);

    return objectFilter(
      courseCreated.dataValues,
      transformCourse(courseCreated.dataValues)
    );
  } catch (error) {
    checkError(error);
  }
};

const removeCourse = async (args, req) => {
  try {
    checkAuthentication(req, courseScopes.removeCourse.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const courseRemoved = await db.course.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (!courseRemoved) throw "not found";

    return "course removed";
  } catch (error) {
    checkError(error);
  }
};

const searchCourses = async (args, req) => {
  try {
    checkAuthentication(req, courseScopes.searchCourses.name);
  } catch (error) {
    checkError(error);
  }

  try {
    if ("start" in args.params) {
      if (!checkISODate(args.params.start)) throw "bad request";
    }

    if ("end" in args.params) {
      if (!checkISODate(args.params.end)) throw "bad request";
    }
  } catch (error) {
    checkError(error);
  }

  try {
    const courses = await db.course.findAll({
      where: { ...args.params }
    });

    if (!courses.length) throw "not found";

    let _courses = [];

    // N+1 problem, it needs to be optimized
    for (let course of courses) {
      //   let _creator = await queryHelper("user", {
      //     where: { id: course.creator }
      //   });

      _courses.push(
        objectFilter(course.dataValues, transformCourse(course.dataValues))
      );
    }

    return _courses;
  } catch (error) {
    checkError(error);
  }
};

const listCourses = async (args, req) => {
  try {
    checkAuthentication(req, courseScopes.listCourses.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const courses = args.private
      ? await db.course.findAll()
      : await db.course.findAll({ where: { private: false } });

    if (!courses.length) throw "not found";

    let _courses = [];

    // N+1 problem, it needs to be optimized
    for (let course of courses) {
      //   let _creator = await queryHelper("user", {
      //     where: { id: course.creator }
      //   });

      _courses.push(
        objectFilter(course.dataValues, transformCourse(course.dataValues))
      );
    }

    return _courses;
  } catch (error) {
    checkError(error);
  }
};

const updateCourse = async (args, req) => {
  try {
    checkAuthentication(req, courseScopes.updateCourse.name);
  } catch (error) {
    checkError(error);
  }

  try {
    if ("start" in args.params) {
      if (!checkISODate(args.params.start)) throw "bad request";
    }

    if ("end" in args.params) {
      if (!checkISODate(args.params.end)) throw "bad request";
    }
  } catch (error) {
    checkError(error);
  }

  try {
    const course = await queryHelper(
      "course",
      { where: { id: args.params.id } },
      true
    );

    if (!course) throw "not found";

    delete args.params.id;

    const courseUpdated = await course.update({ ...args.params });

    if (Object.keys(courseUpdated._changed).length)
      return objectFilter(
        courseUpdated.dataValues,
        transformCourse(courseUpdated.dataValues)
      );
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createCourse,
  removeCourse,
  searchCourses,
  listCourses,
  updateCourse
};
