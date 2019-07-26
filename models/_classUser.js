module.exports = (sequelize, DataTypes) => {
  const ClassUser = sequelize.define(
    "classUser",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true
      }
    },
    {
      freezeTableName: true
    }
  );

  return ClassUser;
};
