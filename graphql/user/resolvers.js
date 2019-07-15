const db = require("../../models");

const { errorName } = require("../constants");

module.exports = {
  user: () => {
    return users;
  },
  createUser: async args => {
    const user = {
      email: args.userInput.email,
      password: args.userInput.password,
      cpf: args.userInput.cpf,
      matriculation: args.userInput.matriculation,
      firstName: args.userInput.firstName,
      secondName: args.userInput.secondName
    };

    try {
      const _user = await db.sequelize.models.user.create(user);

      if (_user.hasOwnProperty("errors") && _users["errors"].length)
        throw _user["errors"];

      return user;
    } catch (error) {
      switch (error["errors"][0]["type"]) {
        case "unique violation":
          throw new Error(errorName.conflict);
        default:
          throw new Error(errorName.internal);
      }
    }
  }
};
