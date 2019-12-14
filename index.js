const graphQlHTTP = require("express-graphql");

const express = require("express");

const graphqlSR = require("./graphql");

const { errorType } = require("./graphql/constants");

const { auth } = require("./middleware/auth");

const cors = require("cors");

// Express application
const app = express();

// Cross origin resources middleware
app.use(cors());

// Authenticate / authorize middleware
app.use(auth);

// GraphQL endpoint
const endpoint = "/graphql";

// GraphQL middleware
app.use(
  endpoint,
  graphQlHTTP({
    schema: graphqlSR.schema,
    rootValue: graphqlSR.resolvers,
    graphiql: true,
    pretty: true,
    customFormatErrorFn: error => {
      console.log(error);

      try {
        return {
          message: errorType[error.message].message,
          statusCode: errorType[error.message].statusCode,
          path: error.path,
          locations: error.locations
        };
      } catch (_error) {
        return error;
      }
    }
  })
);

// Index
app.get("/", (req, res) => {
  return res.redirect(endpoint);
});

// Start server
app.listen(3000, () => {});
