const db = require("./models");

const bcryptjs = require("bcryptjs");

const scopes = require("./graphql/scopes");

const generateAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash("000000", 12);

    db.user.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "11111111111",
      matriculation: "2222",
      firstName: "Admin",
      secondName: "",
      creator: 1
    });
  } catch (error) {
    console.log(error.original.sqlMessage);
  }
};

const generateScopes = async () => {
  try {
    return await db.scope.bulkCreate(scopes).map(scope => scope.dataValues);
  } catch (error) {
    console.log(error.original.sqlMessage);
  }
};

// generateScopes();

// generateAdmin()
