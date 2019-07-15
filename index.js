const graphQlHTTP = require("express-graphql");

const express = require("express");

const app = express();

const graphqlSR = require("./graphql");

const { errorType } = require("./graphql/constants");

// process.env.key-name

app.use(
  "/graphql",
  graphQlHTTP({
    schema: graphqlSR.schema,
    rootValue: graphqlSR.resolvers,
    graphiql: true,
    pretty: true,
    customFormatErrorFn: error => {
      _error = errorType[error.message];

      return {
        message: _error.message,
        statusCode: _error.statusCode,
        path: error.path
        // locations: error.locations
      };
    }
  })
);

app.get("/", (req, res) => {
  return res.redirect("/graphql");
});

app.listen(3000, () => {
  // console.log("🚀 Server on http://localhost:3000");
});
