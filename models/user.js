export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true
      },
      gender: DataTypes.CHAR(1),
      birth: DataTypes.DATEONLY,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  User.associate = models => {
    User.hasMany(models.contact, { as: "contacts" });

    User.belongsToMany(models.scope, {
      through: models.userScope,
      foreignKey: "userId",
      as: "users"
    });
  };

  return User;
};
