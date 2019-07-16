const db = require("../../models");

const { errorName } = require("../constants");

const bcryptjs = require("bcryptjs");

const { checkError } = require("../utils");

module.exports = {
  searchUser: async args => {
    try {
      const user = await db.user.findOne({ where: { id: args.id } });

      return Object.assign({}, user.dataValues, { password: null });
    } catch (error) {
      return null;
    }
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
        secondName: args.userInput.secondName,
        creator: args.userInput.creator
      };

      await db.user.create(user);

      return Object.assign({}, user, { password: null });
    } catch (error) {
      if (error.hasOwnProperty("errors") && error["errors"].length) {
        console.log(error.errors[0].message);

        checkError(error.errors[0].type);
      }

      throw new Error(errorName.internal);
    }
  }
};
