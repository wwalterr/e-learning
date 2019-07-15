module.exports = (sequelize, DataTypes) => {
  const Scope = sequelize.define(
    "scope",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      as: "scopes"
    });
  };

  return Scope;
};
