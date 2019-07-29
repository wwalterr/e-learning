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

    case "no content":
      throw new Error(errorName.noContent);

    default:
      throw new Error(errorName.internal);
  }
};

const formatDate = date => {
  return new Date(date).toISOString();
};

const createdAtUpdatedAt = args => {
  const defaultDates = { createdAt: "", updatedAt: "" };

  if ("createdAt" in args && "updatedAt" in args) {
    defaultDates.createdAt = formatDate(args.createdAt);

    defaultDates.updatedAt = formatDate(args.updatedAt);
  }

  if ("start" in args && "end" in args) {
    defaultDates.start = formatDate(args.start);

    defaultDates.end = formatDate(args.end);
  }

  return defaultDates;
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

const checkISODate = date => {
  // If the date it's totally out of the pattern, an internal error will, probably, be issued

  const pattern = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

  return pattern.test(date);
};

module.exports = {
  queryHelper,
  checkError,
  formatDate,
  createdAtUpdatedAt,
  objectFilter,
  checkAuthentication,
  checkISODate
};
