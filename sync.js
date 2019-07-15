const db = require("./models");

const syncDb = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

syncDb();

module.exports.syncDb = syncDb;
