// import db from "./models";

const graphQlHTTP = require("express-graphql");

const { buildSchema } = require("graphql");

const express = require("express");

const app = express();

let users = [];

app.use(
  "/graphql",
  graphQlHTTP({
    schema: buildSchema(`
      type User {
        id: Int
        email: String!
        password: String!
        cpf: String
        matriculation: String!
        firstName: String!
        secondName: String!
      }

      input UserInput {
        email: String!
        password: String!
        cpf: String
        matriculation: String!
        firstName: String!
        secondName: String!
      }

      type RootQuery {
        user: [User!]!
      }   

      type RootMutation {
        createUser(userInput: UserInput): User
      }

      schema {
        query:
            RootQuery
        mutation:
            RootMutation
      }
    `),
    rootValue: {
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
    }, // Resolvers
    graphiql: true,
    pretty: true
  })
);

app.listen(3000, () => {
  console.log("🚀 Server on http://localhost:3000");
});
