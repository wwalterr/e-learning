export default (sequelize, DataTypes) => {
  const ClassUser = sequelize.define(
    "classUser",
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

  return ClassUser;
};
