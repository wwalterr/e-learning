const { createdAtUpdatedAt } = require("../utils");

const transformCourse = course => {
  return {
    id: null,
    ...createdAtUpdatedAt(course)
  };
};

module.exports = {
  transformCourse
};
