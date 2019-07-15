module.exports = (sequelize, DataTypes) => {
  const CourseUser = sequelize.define(
    "courseUser",
    {},
    {
      freezeTableName: true
    }
  );

  return CourseUser;
};
