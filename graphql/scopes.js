const userScopes = require("./user/scopes");

const scopeScopes = require("./scope/scopes");

const contactScopes = require("./contact/scopes");

const addressScopes = require("./address/scopes");

const courseScopes = require("./course/scopes");

const userScopeScopes = require("./userScope/scopes");

const courseUserScopes = require("./courseUser/scopes");

const classScopes = require("./class/scopes");

const classUserScopes = require("./classUser/scopes");

const progressScopes = require("./progress/scopes");

module.exports = {
  ...userScopes,
  ...scopeScopes,
  ...contactScopes,
  ...addressScopes,
  ...courseScopes,
  ...userScopeScopes,
  ...courseUserScopes,
  ...classScopes,
  ...classUserScopes
};
