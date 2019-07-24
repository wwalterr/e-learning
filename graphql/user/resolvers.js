const db = require("../../models");

const bcryptjs = require("bcryptjs");

const {
  userHelper,
  checkEmptyPassword,
  transformUser,
  checkEmail
} = require("./utils");

const { checkError, objectFilter } = require("../utils");

const jwt = require("jsonwebtoken");

const searchUser = async args => {
  try {
    const user = await userHelper({ where: { id: args.id } });

    if (!user) throw "not found";

    const creator = await userHelper({ where: { id: user.creator } });

    return objectFilter(user, transformUser(user, creator));
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const createUser = async args => {
  try {
    const user = await userHelper({ where: { id: args.params.creator } });

    if (!user) throw "not found";
  } catch (error) {
    console.log(error);

    checkError(error);
  }

  try {
    if (checkEmptyPassword(args.params.password)) throw "bad request";

    if (!checkEmail(args.params.email)) throw "bad request";

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

    const creator = await userHelper({
      where: { id: userCreated.dataValues.creator }
    });

    return objectFilter(userCreated.dataValues, transformUser(user, creator));
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

    if (!userRemoved) throw "not found";

    return "user removed";
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const updateUser = async args => {
  try {
    const user = await userHelper({ where: { id: args.params.id } }, true);

    if (!user) throw "not found";

    delete args.params.id;

    if ("password" in args.params) {
      if (checkEmptyPassword(args.params.password)) throw "bad request";

      const hashedPassword = await bcryptjs.hash(args.params.password, 12);

      args.params.password = hashedPassword;
    }

    const userUpdated = await user.update({ ...args.params });

    if (Object.keys(userUpdated._changed).length) {
      const creator = await userHelper({
        where: { id: userUpdated.dataValues.creator }
      });

      return objectFilter(
        userUpdated.dataValues,
        transformUser(userUpdated.dataValues, creator)
      );
    }
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const listUsers = async args => {
  try {
    if ("all" in args && "creator" in args) throw "bad request";

    const users =
      "all" in args
        ? await db.user.findAll()
        : await db.user.findAll({
            where: {
              creator: args.creator,
              id: { [db.Sequelize.Op.notIn]: [args.creator] }
            }
          });

    if (!users.length) throw "not found";

    let creator;

    if ("creator" in args) {
      creator = await userHelper({
        where: { id: args.creator }
      });
    }

    let _users = [];

    // N+1 problem, it needs to be optimized
    for (user of users) {
      if ("creator" in args)
        _users.push(
          objectFilter(user.dataValues, transformUser(user.dataValues, creator))
        );
      else {
        let _creator = await userHelper({ where: { id: user.creator } });

        _users.push(
          objectFilter(
            user.dataValues,
            transformUser(user.dataValues, _creator)
          )
        );
      }
    }

    return _users;
  } catch (error) {
    console.log(error);

    checkError(error);
  }
};

const login = async args => {
  try {
    if (!checkEmail(args.email)) throw "bad request";

    const user = await db.user.findOne({ where: { email: args.email } });

    if (!user) throw "not found";

    const isEqual = await bcryptjs.compare(
      args.password,
      user.dataValues.password
    );

    if (!isEqual) throw "unauthorized";

    // The first argument is the data stored in the token
    //
    // The second argument is used to hash / validate the token
    //
    // The third argument define the token expiration
    const token = jwt.sign({ userId: user.id }, process.env.jwtKey, {
      expiresIn: process.env.jwtExpiration
    });

    return {
      userId: user.id,
      token,
      tokenExpiration: process.env.jwtExpirationInt
    };
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
  listUsers,
  login
};
