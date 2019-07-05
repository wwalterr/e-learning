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
      },
      classUserId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Progress.associate = models => {
    Progress.belongsTo(models.classUser, {
      foreignKey: "classUserId",
      as: "classUser"
    });
  };

  return Progress;
};
