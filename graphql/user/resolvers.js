let users = [];

module.exports = {
  user: () => {
    return users;
  },
  createUser: args => {
    const user = {
      email: args.userInput.email,
      password: args.userInput.password,
      cpf: args.userInput.cpf,
      matriculation: args.userInput.matriculation,
      firstName: args.userInput.firstName,
      secondName: args.userInput.secondName
    };

    users.push(user);

    return user;
  }
};
