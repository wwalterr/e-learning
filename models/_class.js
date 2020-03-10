module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "class",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true
      },
      vacancies: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      instructor: {
        type: DataTypes.INTEGER,
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
      time: {
        type: DataTypes.TIME,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Class.associate = models => {
    Class.belongsTo(models.course, { foreignKey: "courseId", as: "course" });

    Class.belongsToMany(models.user, {
      through: models.classUser,
      foreignKey: "classId",
      as: "users"
    });
  };

  return Class;
};
