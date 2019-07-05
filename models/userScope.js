export default (sequelize, DataTypes) => {
  const UserScope = sequelize.define(
    "userScope",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      freezeTableName: true
    }
  );

  return UserScope;
};
