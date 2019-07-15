module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define(
    "avatar",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      image: {
        type: DataTypes.BLOB("long"),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mimetype: {
        type: DataTypes.STRING(127),
        allowNull: false
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Avatar.associate = models => {
    Avatar.belongsTo(models.user, { foreignKey: "userId", as: "avatar" });
  };

  return Avatar;
};
