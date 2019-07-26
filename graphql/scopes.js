const userScopes = require("./user/scopes");

const scopeScopes = require("./scope/scopes");

const contactScopes = require("./contact/scopes");

module.exports = {
  ...userScopes,
  ...scopeScopes,
  ...contactScopes
};
