// import db from "./models";

const graphQlHTTP = require("express-graphql");

const { buildSchema } = require("graphql");

const express = require("express");

const app = express();

app.use(
  "/graphql",
  graphQlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }   

        type RootMutation {
          createEvent(name: String): String
        }

        schema {
            query:
                RootQuery
            mutation:
                RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ["test1", "test2"];
      },
      createEvent: args => {
        const eventName = args.name;

        return eventName;
      }
    }, // Resolvers
    graphiql: true,
    pretty: true
  })
);

app.listen(3000, () => {
  console.log("🚀 Server on http://localhost:3000");
});
