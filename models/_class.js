export default (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "class",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      vacancies: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      room: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shift: {
        type: DataTypes.STRING,
        allowNull: false
      },
      courseId: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  );

  Class.associate = models => {
    Class.belongsTo(models.course, { foreignKey: "courseId", as: "course" });
  };

  return Class;
};
