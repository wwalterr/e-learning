export default (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      complement: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING(15),
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Address.associate = models => {
    Address.belongsTo(models.user, { foreignKey: "userId", as: "address" });
  };

  return Address;
};
