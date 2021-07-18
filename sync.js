const db = require("./models");

const sync = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    throw error;
  }
};

if (require.main === module) sync();

module.exports = {
  sync,
};
