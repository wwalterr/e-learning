const db = require("../../models");

const {
  checkError,
  objectFilter,
  checkAuthentication,
  queryHelper,
  createdAtUpdatedAt
} = require("../utils");

const progressScopes = require("./scopes");

const createProgress = async (args, req) => {
  try {
    checkAuthentication(req, progressScopes.createProgress.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const classUser = await queryHelper("classUser", {
      where: { id: args.params.classUserId }
    });

    if (!classUser) throw "not found";
  } catch (error) {
    checkError(error);
  }

  try {
    const progress = {
      attendance: args.params.attendance,
      grade: args.params.grade,
      classUserId: args.params.classUserId
    };

    let progressCreated = await db.progress.create(progress);

    return objectFilter(
      progressCreated.dataValues,
      createdAtUpdatedAt(progressCreated.dataValues)
    );
  } catch (error) {
    checkError(error);
  }
};

const removeProgress = async (args, req) => {
  try {
    checkAuthentication(req, progressScopes.removeProgress.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const progressRemoved = await db.progress.destroy({
      where: { ...args },
      limit: 1
    });

    if (!progressRemoved) throw "not found";

    return "progress user removed";
  } catch (error) {
    checkError(error);
  }
};

const updateProgress = async (args, req) => {
  try {
    checkAuthentication(req, progressScopes.updateProgress.name);
  } catch (error) {
    checkError(error);
  }

  try {
    if ("classUserId" in args.params) {
      const classUser = await queryHelper("classUser", {
        where: { id: args.params.classUserId }
      });

      if (!classUser) throw "not found";
    }
  } catch (error) {
    checkError(error);
  }

  try {
    const progress = await queryHelper(
      "progress",
      { where: { id: args.params.id } },
      true
    );

    if (!progress) throw "not found";

    delete args.params.id;

    const progressUpdated = await progress.update({ ...args.params });

    if (Object.keys(progressUpdated._changed).length)
      return objectFilter(
        progressUpdated.dataValues,
        createdAtUpdatedAt(progressUpdated.dataValues)
      );

    throw "no content";
  } catch (error) {
    checkError(error);
  }
};

const listProgresses = async (args, req) => {
  try {
    checkAuthentication(req, progressScopes.listProgresses.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const progresses = Object.keys(args.params).length
      ? await db.progress.findAll({ where: { ...args.params } })
      : await db.progress.findAll();

    if (!progresses.length) throw "not found";

    return progresses.map(progress => {
      return objectFilter(
        progress.dataValues,
        createdAtUpdatedAt(progress.dataValues)
      );
    });
  } catch (error) {
    checkError(error);
  }
};

module.exports = {
  createProgress,
  removeProgress,
  updateProgress,
  listProgresses
};
