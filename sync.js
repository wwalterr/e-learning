const db = require("./models");

const syncDb = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    console.log(error);

    throw error;
  }
};

syncDb();
