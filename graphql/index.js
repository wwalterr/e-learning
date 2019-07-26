// Schema
const { buildSchema } = require("graphql");

const userSchema = require("./user/schema");

const scopeSchema = require("./scope/schema");

const contactSchema = require("./contact/schema");

module.exports.schema = buildSchema(`
    ${userSchema}

    ${scopeSchema}

    ${contactSchema}

    type RootQuery {
        searchUser(id: Int!): User!
        listUsers(creator: Int, all: Boolean): [User!]
        login(email: String!, password: String!): Token!

        searchScope(name: String!): Scope!
        listScopes: [Scope!]

        listContacts(userId: Int): [Contact!]
    }   

    type RootMutation {
        createUser(params: UserInput!): User!
        removeUser(id: Int!): String!
        updateUser(params: UserUpdateInput!): User!

        createScope(params: ScopeInput!): Scope!
        removeScope(name: String!): String!
        updateScope(params: ScopeUpdate!): Scope!

        createContact(params: ContactInput!): Contact!
        removeContact(id: Int!): String!
        updateContact(params: ContactUpdate!): Contact!
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

const scopeResolvers = require("./scope/resolvers");

const contactResolvers = require("./contact/resolvers");

module.exports.resolvers = {
  ...userResolvers,
  ...scopeResolvers,
  ...contactResolvers
};
