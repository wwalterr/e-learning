module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define(
    "progress",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true
      },
      attendance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade: {
        type: DataTypes.FLOAT,
        allowNull: false
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
