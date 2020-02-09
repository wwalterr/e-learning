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
      cpf: "92711239055",
      matriculation: "4000",
      firstName: "Admin",
      secondName: "Management",
      creator: 1
    };

    const address = {
      street: "Rua Benedito Correia Penha",
      number: 101,
      complement: "Floor 2",
      city: "Vitória",
      state: "Espírito Santo",
      zipCode: "29120311",
      userId: 1
    };

    const contact = {
      email: "admin-backup@gmail.com",
      phone: "34991634340",
      userId: 1
    };

    const course1 = {
      title: "Private",
      description: "Learn how too play piano",
      start: "2019-07-27T19:16:42.599Z",
      end: "2019-07-27T19:16:57.509Z",
      creator: 1,
      private: true
    };

    const course2 = {
      title: "Public",
      description: "Learn how too play guitar",
      start: "2019-07-27T19:16:42.599Z",
      end: "2019-07-27T19:16:57.509Z",
      creator: 1,
      private: false
    };

    const userCreated = await db.user.create(user);

    const addressCreated = await db.address.create(address);

    const contactCreated = await db.contact.create(contact);

    const coursesCreated = await db.course.bulkCreate([course1, course2]);

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
