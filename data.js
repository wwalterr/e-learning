const db = require("./models");

const bcryptjs = require("bcryptjs");

const scopes = require("./graphql/scopes");

const generateAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash("123456", 12);

    // If the data in database is removed and generate, but
    // the database itself is not recreated, the creator id
    // can cause errors, once it is incremental
    const user = {
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "",
      matriculation: "",
      firstName: "Admin",
      secondName: "",
      creator: 1
    };

    const userCreated = await db.user.create(user);

    userCreated.update({ creator: userCreated.dataValues.id });

    return userCreated;
  } catch (error) {
    throw error;
  }
};

const generateScopes = async () => {
  try {
    return await db.scope
      .bulkCreate(Object.values(scopes))
      .map(scope => scope.dataValues);
  } catch (error) {
    throw error;
  }
};

const userScope = async () => {
  try {
    const user = await generateAdmin();

    const _scopes = await generateScopes();

    const userScopeValues = _scopes.map(scope => ({
      userId: user.dataValues.id,
      scopeId: scope.id
    }));

    return await db.userScope
      .bulkCreate(userScopeValues)
      .map(userScope => userScope.dataValues);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateAdmin,
  generateScopes,
  userScope
};

if (require.main === module) userScope();
