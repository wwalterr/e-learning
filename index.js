const graphQlHTTP = require("express-graphql");

const express = require("express");

const graphqlSR = require("./graphql");

const { errorType } = require("./graphql/constants");

const { auth } = require("./middleware/auth");

const cors = require("cors");

require("dotenv").config();

// Express application
const app = express();

// Cross origin resources middleware
app.use(cors());

// Authentication and authentication middleware
app.use(auth);

// GraphQL endpoint
const endpoint = "/graphql";

// GraphQL playground
const graphiql = false;

// GraphQL middleware
app.use(
  endpoint,
  graphQlHTTP({
    schema: graphqlSR.schema,
    rootValue: graphqlSR.resolvers,
    graphiql,
    pretty: true,
    customFormatErrorFn: (error) => {
      try {
        return {
          message: errorType[error.message].message,
          statusCode: errorType[error.message].statusCode,
          path: error.path,
          locations: error.locations,
        };
      } catch (_error) {
        return error;
      }
    },
  })
);

// Index
app.get("/", (req, res) => {
  if (graphiql) return res.redirect(endpoint);
});

// Start a server
const serverPort = 3000;

app.listen(serverPort, () => {
  console.log(
    `Server listening on http://localhost:\x1b[32m${serverPort}\x1b[0m`
  );
});
