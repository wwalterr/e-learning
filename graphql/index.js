// Schema
const { buildSchema } = require("graphql");

const userSchema = require("./user/schema");

module.exports.schema = buildSchema(`
    ${userSchema}

    type RootQuery {
        searchUser(id: Int): User
    }   

    type RootMutation {
        createUser(params: UserInput): User
        removeUser(id: Int): String
        updateUser(params: UserUpdateInput): User
    }

    schema {
        query:
            RootQuery
        mutation:
            RootMutation
    }
`);

// Resolvers
const userResolvers = require("./user/resolvers");

module.exports.resolvers = {
  ...userResolvers
};
