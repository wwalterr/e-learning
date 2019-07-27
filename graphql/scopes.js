const userScopes = require("./user/scopes");

const scopeScopes = require("./scope/scopes");

const contactScopes = require("./contact/scopes");

const addressScopes = require("./address/scopes");

const courseScopes = require("./course/scopes");

module.exports = {
  ...userScopes,
  ...scopeScopes,
  ...contactScopes,
  ...addressScopes,
  ...courseScopes
};
