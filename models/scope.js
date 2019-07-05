export default (sequelize, DataTypes) => {
  const Scope = sequelize.define(
    "scope",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
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

  Scope.associate = (models) => {
    Scope.belongsToMany(models.user, { through: models.userScope });
  };

  return Scope;
};
