export default (sequelize, DataTypes) => {
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
      mimetype: DataTypes.STRING(127),
      size: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Avatar.associate = models => {
    Avatar.belongsTo(models.user, { foreignKey: "userId", as: "user" });
  };

  return Avatar;
};
