// Schema
const { buildSchema } = require("graphql");

const userSchema = require("./user/schema");

const scopeSchema = require("./scope/schema");

const contactSchema = require("./contact/schema");

const addressSchema = require("./address/schema");

module.exports.schema = buildSchema(`
    ${userSchema}

    ${scopeSchema}

    ${contactSchema}

    ${addressSchema}

    type RootQuery {
        searchUser(id: Int!): User!
        listUsers(creator: Int, all: Boolean): [User!]
        login(email: String!, password: String!): Token!

        searchScope(name: String!): Scope!
        listScopes: [Scope!]

        listContacts(userId: Int!): [Contact!]

        listAddresses(userId: Int!): [Address!]
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

        createAddress(params: AddressInput!): Address!
        removeAddress(id: Int!): String!
        updateAddress(params: AddressUpdate!): Address!
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

const addressResolvers = require("./address/resolvers");

module.exports.resolvers = {
  ...userResolvers,
  ...scopeResolvers,
  ...contactResolvers,
  ...addressResolvers
};
