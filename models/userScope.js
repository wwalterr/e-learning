export default (sequelize, DataTypes) => {
  const UserScope = sequelize.define(
    "userScope",
    {
    },
    {
      freezeTableName: true
    }
  );

  return UserScope;
};
