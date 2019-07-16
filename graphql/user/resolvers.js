const db = require("../../models");

const bcryptjs = require("bcryptjs");

const { checkError } = require("../utils");

const searchUser = async args => {
  try {
    const user = await db.user.findOne({ where: { id: args.id } });

    return Object.assign({}, user.dataValues, { password: null });
  } catch (error) {
    console.log(error);

    return null;
  }
};

const createUser = async args => {
  try {
    if (!(await searchUser({ id: args.userInput.creator }))) throw "not found";
  } catch (error) {
    checkError(error);
  }

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
    console.log(error);

    checkError("unique violation");
  }
};

module.exports = {
  searchUser,
  createUser
};
