const db = require("./models");

const sjcl = require("sjcl");

const scopes = require("./graphql/scopes");

const generateAdmin = async () => {
  try {
    const hashedPassword = sjcl.encrypt("password", "123456");

    // If the data in database is removed and generate, but
    // the database itself is not recreated, the creator id
    // can cause errors, once it is incremental
    const user = {
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "00000000000",
      matriculation: "0000",
      firstName: "Admin",
      secondName: "",
      creator: 1
    };

    const address = {
      street: "Street",
      number: 000,
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "00000000",
      userId: 1
    };

    const contact = {
      email: "admin-backup@gmail.com",
      phone: "0000000000000",
      userId: 1
    };

	const userCreated = await db.user.create(user);

    const addressCreated = await db.address.create(address);

    const contactCreated = await db.contact.create(contact);

    userCreated.update({
      creator: userCreated.dataValues.id,
      address: { ...addressCreated.dataValues },
      contact: { ...contactCreated.dataValues }
    });

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
