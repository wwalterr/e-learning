const graphQlHTTP = require("express-graphql");

const express = require("express");

const app = express();

const graphqlSR = require("./graphql");

const { errorType } = require("./graphql/constants");

const { auth } = require("./middleware/auth");

app.use(auth);

app.use(
  "/graphql",
  graphQlHTTP({
    schema: graphqlSR.schema,
    rootValue: graphqlSR.resolvers,
    graphiql: true,
    pretty: true,
    customFormatErrorFn: error => {
      let _error = errorType[error.message];

      return {
        message: _error.message,
        statusCode: _error.statusCode,
        path: error.path,
        locations: error.locations
      };
    }
  })
);

app.get("/", (req, res) => {
  return res.redirect("/graphql");
});

app.listen(3000, () => {});
