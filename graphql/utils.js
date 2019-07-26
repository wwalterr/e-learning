const db = require("../models");

const { errorName } = require("./constants");

const queryHelper = async (
  model,
  query,
  raw = false,
  attribute = "dataValues"
) => {
  try {
    const queryResult = await db[model].findOne(query);

    if (raw) return queryResult;

    const _attribute = queryResult[attribute];

    return _attribute;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const checkError = errorType => {
  switch (errorType) {
    case "unique violation":
      throw new Error(errorName.conflict);

    case "not found":
      throw new Error(errorName.notFound);

    case "bad request":
      throw new Error(errorName.badRequest);

    case "unauthorized":
      throw new Error(errorName.unauthorized);

    default:
      throw new Error(errorName.internal);
  }
};

const formatDate = date => {
  return new Date(date).toISOString();
};

const createdAtUpdatedAt = args => {
  if ("createdAt" in args && "updatedAt" in args)
    return {
      createdAt: formatDate(args.createdAt),
      updatedAt: formatDate(args.updatedAt)
    };

  return { createdAt: "", updatedAt: "" };
};

const objectFilter = (args, filter) => {
  if (!Object.keys(args).length) return {};

  return Object.assign({}, args, filter);
};

const checkAuthentication = (req, scope) => {
  if (!req.isAuthenticated) {
    // console.log("Token not found, empty token or token bad formated");

    throw "unauthorized";
  }

  if (!req.hasOwnProperty("scopes") || !req.scopes) {
    // console.log("Token bad formated or scopes were not added in the token");

    throw "unauthorized";
  }

  if (!req.scopes.includes(scope)) {
    // console.log("Doesn't has the required scope to access");

    throw "unauthorized";
  }
};

module.exports = {
  queryHelper,
  checkError,
  formatDate,
  createdAtUpdatedAt,
  objectFilter,
  checkAuthentication
};
