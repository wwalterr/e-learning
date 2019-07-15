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
      await db.sequelize.models.user.create(user);

      return user;
    } catch (error) {
      throw new Error(errorName.conflict);
    }
  }
};
