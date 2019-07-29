const db = require("../../models");

const {
  checkError,
  checkAuthentication,
  queryHelper,
  objectFilter,
  createdAtUpdatedAt
} = require("../utils");

const classScopes = require("./scopes");

const createClass = async (args, req) => {
  try {
    checkAuthentication(req, classScopes.createClass.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const instructor = await queryHelper("user", {
      where: { id: args.params.instructor }
    });

    if (!instructor) throw "not found";

    const course = await queryHelper("course", {
      where: { id: args.params.courseId }
    });

    if (!course) throw "not found";
  } catch (error) {
    checkError(error);
  }

  try {
    const _class = {
      vacancies: args.params.vacancies,
      instructor: args.params.instructor,
      room: args.params.room,
      shift: args.params.shift,
      courseId: args.params.courseId
    };

    let classCreated = await db.class.create(_class);

    return objectFilter(
      classCreated.dataValues,
      createdAtUpdatedAt(classCreated.dataValues)
    );
  } catch (error) {
    checkError(error);
  }
};

const removeClass = async (args, req) => {
  try {
    checkAuthentication(req, classScopes.removeClass.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const classRemoved = await db.class.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (!classRemoved) throw "not found";

    return "class removed";
  } catch (error) {
    checkError(error);
  }
};

const updateClass = async (args, req) => {
  try {
    checkAuthentication(req, classScopes.updateClass.name);
  } catch (error) {
    checkError(error);
  }

  try {
    if ("instructor" in args.params) {
      const instructor = await queryHelper("user", {
        where: { id: args.params.instructor }
      });

      if (!instructor) throw "not found";
    }

    if ("courseId" in args.params) {
      const course = await queryHelper("course", {
        where: { id: args.params.courseId }
      });

      if (!course) throw "not found";
    }
  } catch (error) {
    checkError(error);
  }

  try {
    const _class = await queryHelper(
      "class",
      { where: { id: args.params.id } },
      true
    );

    if (!_class) throw "not found";

    delete args.params.id;

    const classUpdated = await _class.update({ ...args.params });

    if (Object.keys(classUpdated._changed).length)
      return objectFilter(
        classUpdated.dataValues,
        createdAtUpdatedAt(classUpdated.dataValues)
      );

    throw "no content";
  } catch (error) {
    checkError(error);
  }
};

const listClasses = async (args, req) => {
  try {
    checkAuthentication(req, classScopes.listClasses.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const classes = Object.keys(args.params).length
      ? await db.class.findAll({ where: { ...args.params } })
      : await db.class.findAll();

    if (!classes.length) throw "not found";

    return classes.map(_class => {
      return objectFilter(
        _class.dataValues,
        createdAtUpdatedAt(_class.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createClass,
  removeClass,
  updateClass,
  listClasses
};
