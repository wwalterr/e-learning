const db = require("../../models");

const bcryptjs = require("bcryptjs");

const {
  checkError,
  checkEmptyPassword,
  createdAtUpdatedAt
} = require("../utils");

const searchUser = async args => {
  try {
    const user = await db.user.findOne({ where: { id: args.id } });

    if (user) {
      return Object.assign({}, user.dataValues, {
        password: null,
        creator: null,
        ...createdAtUpdatedAt(user.dataValues)
      });
    }

    throw "not found";
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const createUser = async args => {
  try {
    const _user = await db.user.findOne({
      where: { id: args.params.creator }
    });

    if (!_user) throw "not found";
  } catch (error) {
    console.log(error);

    checkError(error);
  }

  try {
    if (checkEmptyPassword(args.params.password)) throw "bad request";

    const hashedPassword = await bcryptjs.hash(args.params.password, 12);

    const user = {
      email: args.params.email,
      password: hashedPassword,
      cpf: args.params.cpf,
      matriculation: args.params.matriculation,
      firstName: args.params.firstName,
      secondName: args.params.secondName,
      creator: args.params.creator
    };

    let userCreated = {};

    try {
      userCreated = await db.user.create(user);
    } catch (error) {
      throw "unique violation";
    }

    return Object.assign({}, userCreated.dataValues, {
      password: null,
      creator: null,
      ...createdAtUpdatedAt(userCreated.dataValues)
    });
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const removeUser = async args => {
  try {
    const userRemoved = await db.user.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (userRemoved) return "user removed";

    throw "not found";
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const updateUser = async args => {
  try {
    const user = await db.user.findOne({
      where: { id: args.params.id }
    });

    if (!user) {
      throw "not found";
    }

    delete args.params.id;

    if ({ ...args.params }.hasOwnProperty("password")) {
      if (checkEmptyPassword(args.params.password)) throw "bad request";

      const hashedPassword = await bcryptjs.hash(args.params.password, 12);

      args.params.password = hashedPassword;
    }

    const userUpdated = await user.update({ ...args.params });

    if (Object.keys(userUpdated._changed).length) {
      return Object.assign({}, userUpdated.dataValues, {
        password: null,
        creator: null,
        ...createdAtUpdatedAt(userUpdated.dataValues)
      });
    }
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const listUsers = async args => {
  try {
    const users = await db.user.findAll({
      where: {
        creator: args.creator,
        id: { [db.Sequelize.Op.notIn]: [args.creator] }
      }
    });

    if (users) {
      return users.map(user =>
        Object.assign({}, user.dataValues, {
          password: null,
          creator: null,
          ...createdAtUpdatedAt(user.dataValues)
        })
      );
    }

    throw "not found";
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

module.exports = {
  searchUser,
  createUser,
  removeUser,
  updateUser,
  listUsers
};
