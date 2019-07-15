module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contact",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: DataTypes.STRING,
      phone: DataTypes.CHAR(15)
    },
    {
      freezeTableName: true
    }
  );

  return Contact;
};
