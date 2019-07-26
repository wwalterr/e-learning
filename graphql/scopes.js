const userScopes = require("./user/scopes");

const scopeScopes = require("./scope/scopes");

const contactScopes = require("./contact/scopes");

const addressScopes = require("./address/scopes");

module.exports = {
  ...userScopes,
  ...scopeScopes,
  ...contactScopes,
  ...addressScopes
};
