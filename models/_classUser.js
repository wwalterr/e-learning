module.exports = (sequelize, DataTypes) => {
  const ClassUser = sequelize.define(
    "classUser",
    {},
    {
      freezeTableName: true
    }
  );

  return ClassUser;
};
