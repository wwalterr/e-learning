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

const removeUser = async args => {
  try {
    const userRemoved = await db.user.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (userRemoved) return "user removed";

    return "user not removed";
  } catch (error) {
    console.log(error);

    checkError("not found");
  }
};

const updateUser = async args => {
  try {
    const user = await db.user.findOne({
      where: { id: args.userUpdateInput.id }
    });

    delete args.userUpdateInput.id;

    if ({ ...args.userUpdateInput }.hasOwnProperty("password")) {
      const hashedPassword = await bcryptjs.hash(
        args.userUpdateInput.password,
        12
      );

      args.userUpdateInput.password = hashedPassword;
    }

    const userUpdated = await user.update({ ...args.userUpdateInput });

    if (Object.keys(userUpdated._changed).length) return "user updated";

    return "user not updated";
  } catch (error) {
    console.log(error);

    checkError("not found");
  }
};

module.exports = {
  searchUser,
  createUser,
  removeUser,
  updateUser
};
