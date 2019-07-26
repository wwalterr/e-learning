module.exports = (sequelize, DataTypes) => {
  const Scope = sequelize.define(
    "scope",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: ""
      },
      description: DataTypes.TEXT
    },
    {
      freezeTableName: true
    }
  );

  Scope.associate = models => {
    Scope.belongsToMany(models.user, {
      through: models.userScope,
      foreignKey: "scopeId",
      as: "users"
    });
  };

  return Scope;
};
