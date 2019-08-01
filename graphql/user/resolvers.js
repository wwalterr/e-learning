const db = require("../../models");

const bcryptjs = require("bcryptjs");

const { checkEmptyPassword, transformUser, checkEmail } = require("./utils");

const {
  checkError,
  objectFilter,
  checkAuthentication,
  queryHelper
} = require("../utils");

const jwt = require("jsonwebtoken");

const userScopes = require("./scopes");

const generatePassword = require("generate-password");

const nodemailer = require("nodemailer");

const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.gmailEmail,
      pass: process.env.gmailPassword
    }
  })
);

const searchUser = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.searchUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const user = await queryHelper("user", { where: { id: args.id } });

    if (!user) throw "not found";

    const creator = await queryHelper("user", { where: { id: user.creator } });

    return objectFilter(user, transformUser(user, creator));
  } catch (error) {
    checkError(error);
  }
};

const createUser = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.createUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const user = await queryHelper("user", {
      where: { id: args.params.creator }
    });

    if (!user) throw "not found";
  } catch (error) {
    checkError(error);
  }

  try {
    let generatedPassword;

    if (checkEmptyPassword(args.params.password)) {
      generatedPassword = generatePassword.generate({
        length: 6,
        numbers: true,
        symbols: false
      });

      args.params.password = generatedPassword;
    }

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

    let userCreated;

    try {
      userCreated = await db.user.create(user);
    } catch (error) {
      throw "unique violation";
    }

    const creator = await queryHelper("user", {
      where: { id: userCreated.dataValues.creator }
    });

    if (generatedPassword) {
      const message = {
        from: process.env.gmailFrom,
        to: `${args.params.firstName} <${args.params.email}>`,
        subject: "Your account has been registered ✔",
        text: "",
        html: `
          <p>You can use the password below to access the platform and change your account' password: </p>

          <span>Password: <strong>${args.params.password}</strong></span>
        `
      };

      try {
        let info = await transporter.sendMail(message);
      } catch (error) {
        console.log(error);

        throw "bad gateway";
      }
    }

    return objectFilter(userCreated.dataValues, transformUser(user, creator));
  } catch (error) {
    checkError(error);
  }
};

const removeUser = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.removeUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const userRemoved = await db.user.destroy({
      where: { id: args.id },
      limit: 1
    });

    if (!userRemoved) throw "not found";

    return "user removed";
  } catch (error) {
    checkError(error);
  }
};

const updateUser = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.updateUser.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const user = await queryHelper(
      "user",
      { where: { id: args.params.id } },
      true
    );

    if (!user) throw "not found";

    delete args.params.id;

    if ("password" in args.params) {
      if (checkEmptyPassword(args.params.password)) throw "bad request";

      const hashedPassword = await bcryptjs.hash(args.params.password, 12);

      args.params.password = hashedPassword;
    }

    const userUpdated = await user.update({ ...args.params });

    if (Object.keys(userUpdated._changed).length) {
      const creator = await queryHelper("user", {
        where: { id: userUpdated.dataValues.creator }
      });

      return objectFilter(
        userUpdated.dataValues,
        transformUser(userUpdated.dataValues, creator)
      );
    }

    throw "no content";
  } catch (error) {
    checkError(error);
  }
};

const listUsers = async (args, req) => {
  try {
    checkAuthentication(req, userScopes.listUsers.name);
  } catch (error) {
    checkError(error);
  }

  try {
    const users = !("creator" in args)
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
      creator = await queryHelper("user", {
        where: { id: args.creator }
      });
    }

    let _users = [];

    // N+1 problem, it needs to be optimized
    for (let user of users) {
      if ("creator" in args)
        _users.push(
          objectFilter(user.dataValues, transformUser(user.dataValues, creator))
        );
      else {
        let _creator = await queryHelper("user", {
          where: { id: user.creator }
        });

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
    checkError(error);
  }
};

const login = async args => {
  try {
    if (!checkEmail(args.email)) throw "bad request";

    const user = await db.user.findOne({
      where: { email: args.email },
      include: [
        {
          model: db.scope,
          as: "scopes"
        }
      ]
    });

    if (!user) throw "not found";

    const isEqual = await bcryptjs.compare(
      args.password,
      user.dataValues.password
    );

    if (!isEqual) throw "unauthorized";

    const scopes = user.scopes.map(scope => scope.dataValues.name);

    // The first argument is the data stored in the token
    //
    // The second argument is used to hash / validate the token
    //
    // The third argument define the token expiration
    const token = jwt.sign({ userId: user.id, scopes }, process.env.jwtKey, {
      expiresIn: process.env.jwtExpiration
    });

    return {
      userId: user.id,
      token,
      tokenExpiration: process.env.jwtExpirationInt,
      scopes,
      firstName: user.firstName
    };
  } catch (error) {
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
