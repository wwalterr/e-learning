const db = require("../../models");

const { errorName } = require("../constants");

const bcryptjs = require("bcryptjs");

const { checkError } = require("../utils");

module.exports = {
  user: () => {
    return [""];
  },
  createUser: async args => {
    try {
      const hashedPassword = await bcryptjs.hash(args.userInput.password, 12);

      const user = {
        email: args.userInput.email,
        password: hashedPassword,
        cpf: args.userInput.cpf,
        matriculation: args.userInput.matriculation,
        firstName: args.userInput.firstName,
        secondName: args.userInput.secondName
      };

      const _user = await db.sequelize.models.user.create(user);

      return Object.assign({}, user, { password: null });
    } catch (error) {
      if (error.hasOwnProperty("errors") && error["errors"].length)
        checkError(error["errors"][0]["type"]);

      throw new Error(errorName.internal);
    }
  }
};
