export default (sequelize, DataTypes) => {
  const Progress = sequelize.define(
    "progress",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      attendance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  return Progress;
};
