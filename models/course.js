export default (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Course.associate = models => {
    Course.belongsToMany(models.user, {
      through: models.courseUser,
      foreignKey: "courseId",
      as: "courses"
    });
  };

  return Course;
};
