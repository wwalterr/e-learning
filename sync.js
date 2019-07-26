const db = require("./models");

const sync = async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sync
};

if (require.main === module) sync();
