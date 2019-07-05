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
      cpf: DataTypes.STRING,
      gender: DataTypes.CHAR(1),
      birth: DataTypes.DATE,
      name: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  return User;
};
