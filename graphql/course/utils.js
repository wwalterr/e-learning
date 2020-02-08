const { createdAtUpdatedAt } = require("../utils");

const transformCourse = (course) => {
  return {
    ...createdAtUpdatedAt(course)
  };
};

module.exports = {
  transformCourse
};
