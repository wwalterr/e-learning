export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contact",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: DataTypes.STRING,
      phone: DataTypes.CHAR(15),
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Contact.associate = models => {
    Contact.belongsTo(models.user, { foreignKey: "userId", as: "user" });
  };

  return Contact;
};
