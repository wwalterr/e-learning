const db = require("./models");

const bcryptjs = require("bcryptjs");
const syncDb = async () => {
  try {
    await db.sequelize.sync();

    const hashedPassword = await bcryptjs.hash("!-", 12);

    db.user.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      cpf: "00000000000",
      matriculation: "1111",
      firstName: "Admin",
      secondName: "",
      creator: 1
    });
  } catch (error) {
    console.log(error);
  }
};

syncDb();

module.exports.syncDb = syncDb;
