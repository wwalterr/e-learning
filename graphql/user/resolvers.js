const db = require("../../models");

const sjcl = require("sjcl");

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

    return {
      ...objectFilter(user, transformUser(user, creator)),
      password: sjcl.decrypt("password", user.password)
    };
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

  let creator;

  try {
    creator = await queryHelper("user", {
      where: { id: args.params.creator }
    });

    if (!creator) throw "not found";
  } catch (error) {
    checkError(error);
  }

  if (checkEmptyPassword(args.params.password)) {
    let generatedPassword = generatePassword.generate({
      length: 6,
      numbers: true,
      symbols: false
    });

    args.params.password = generatedPassword;

    const message = {
      from: process.env.gmailFrom,
      to: `${args.params.firstName || "Unknow"} <${args.params.email}>`,
      subject: "Your account has been registered ✔",
      text: "",
      html: `
        <p>You can use the password below to access the platform, and change your account' password: </p>

        <span>Password: <strong>${generatedPassword}</strong></span>
      `
    };

    try {
      let info = await transporter.sendMail(message);
    } catch (error) {
      // console.log(error);

      throw error; // "bad gateway"
    }
  }

  try {
    if (!checkEmail(args.params.email)) throw "bad request";

    const hashedPassword = sjcl.encrypt("password", args.params.password);

    let userCreated;

    try {
      userCreated = await db.user.create({
        email: args.params.email,
        password: hashedPassword,
        cpf: args.params.cpf,
        matriculation: args.params.matriculation,
        firstName: args.params.firstName,
        secondName: args.params.secondName,
        creator: args.params.creator
      });
    } catch (error) {
      throw "unique violation";
    }

    return objectFilter(
      userCreated.dataValues,
      transformUser(userCreated.dataValues, creator)
    );
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

      const hashedPassword = sjcl.encrypt("password", args.params.password);

      args.params.password = hashedPassword;
    }

    const userUpdated = await user.update({ ...args.params });

    if (Object.keys(userUpdated._changed).length) {
      const creator = await queryHelper("user", {
        where: { id: userUpdated.dataValues.creator }
      });

      return {
        ...objectFilter(
          userUpdated.dataValues,
          transformUser(userUpdated.dataValues, creator)
        ),
        password: sjcl.decrypt("password", userUpdated.dataValues.password)
      };
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

const resetUserPassword = async (args, req) => {
  try {
    const user = await queryHelper(
      "user",
      { where: { email: args.email } },
      true
    );

    if (!user) throw "not found";

    let generatedPassword = generatePassword.generate({
      length: 6,
      numbers: true,
      symbols: false
    });

    const message = {
      from: process.env.gmailFrom,
      to: `${user.dataValues.firstName || "Unknow"} <${user.dataValues.email}>`,
      subject: "Your account password was reseted",
      text: "",
      html: `
        <p>Your new password is: </p>

        <span>Password: <strong>${generatedPassword}</strong></span>
      `
    };

    try {
      let info = await transporter.sendMail(message);
    } catch (error) {
      // console.log(error);

      throw "bad gateway";
    }

    const hashedPassword = sjcl.encrypt("password", generatedPassword);

    user.update({ password: hashedPassword });

    return "password reseted";
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

    const isEqual =
      args.password ===
      sjcl.decrypt(
        "password",
        JSON.stringify(JSON.parse(user.dataValues.password))
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

    const date = new Date();

    const issuedAt = date.getTime();

    const expireAt = date.setTime(
      issuedAt + process.env.jwtExpirationInt * 60 * 60 * 1000
    );

    return {
      userId: user.id,
      token,
      issuedAt,
      expireAt,
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
  resetUserPassword,
  login
};
