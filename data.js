const db = require("./models");

const bcryptjs = require("bcryptjs");

const scopesSR = require("./graphql/scopes");

const generateAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash("123456", 12);

    const user = await db.user.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "11111111111",
      matriculation: "2222",
      firstName: "Admin",
      secondName: "",
      creator: 1
    });

    user.update({ creator: user.dataValues.id });

    return user;
  } catch (error) {
    throw error;
  }
};

const generateScopes = async () => {
  try {
    return await db.scope
      .bulkCreate(Object.values(scopesSR))
      .map(scope => scope.dataValues);
  } catch (error) {
    throw error;
  }
};

const userScope = async () => {
  try {
    const user = await generateAdmin();

    const scopes = await generateScopes();

    const userScopeBulkValues = scopes.map(scope => ({
      userId: user.dataValues.id,
      scopeId: scope.id
    }));

    return await db.userScope
      .bulkCreate(userScopeBulkValues)
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
