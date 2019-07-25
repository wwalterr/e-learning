const userScopes = require("./user/scopes");

const scopeScopes = require("./scope/scopes");

module.exports = { ...userScopes, ...scopeScopes };
