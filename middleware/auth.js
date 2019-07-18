const jwt = require("jsonwebtoken");

// The token is issued in the user schema / resolvers,
// more precisely in the login resolver, that uses
// the environment variables to set the JWT secret
// expiration time and then issue a token with some
// data
//
// Check: nodemon.json, index.js, user/resolvers.js and
// user/schema.js

const auth = (req, res, next) => {
  // Get the value of the key authorization, from
  // request header, if it exist
  const authorization = req.get("Authorization");

  // There is no authorization in the request
  if (!authorization) {
    // Check if the key below is not used by any
    // schema or resolver as an argument
    req.isAuthenticated = false;

    return next();
  }

  // Remove the bearer identify and get the token
  const token = authorization.split(" ")[1];

  // There is authorization in the request, but the
  // token is not well formated or is empty
  if (!token || token === "") {
    req.isAuthenticated = false;

    return next();
  }

  let decodedToken;

  try {
    // Decode the token, using the key that was used
    // to generate the token
    decodedToken = jwt.verify(token, process.env.jwtKey);
  } catch (error) {
    // There is authorization in the request, but the
    // token is not valid, the key is not the right key
    // or the data is corrupted
    req.isAuthenticated = false;

    return next();
  }

  if (!decodedToken) {
    req.isAuthenticated = false;

    return next();
  }

  // There is a valid authorization token in the request
  req.isAuthenticated = true;

  req.userId = decodedToken.userId;

  return next();
};

module.exports = {
  auth
};
