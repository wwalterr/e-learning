const graphQlHTTP = require("express-graphql");

const express = require("express");

const app = express();

const graphqlSR = require("./graphql");

const { errorType } = require("./graphql/constants");

const { auth } = require("./middleware/auth");

const cors = require("cors");

// Cross origin resources
app.use(cors());

// Authenticate / authorize
app.use(auth);

const endpoint = "/graphql";

app.use(
  endpoint,
  graphQlHTTP({
    schema: graphqlSR.schema,
    rootValue: graphqlSR.resolvers,
    graphiql: true,
    pretty: true,
    customFormatErrorFn: error => {
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

app.get("/", (req, res) => {
  return res.redirect(endpoint);
});

app.listen(3000, () => {});
