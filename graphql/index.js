// Schema
const { buildSchema } = require("graphql");

const userSchema = require("./user/schema");

const scopeSchema = require("./scope/schema");

const contactSchema = require("./contact/schema");

const addressSchema = require("./address/schema");

const courseSchema = require("./course/schema");

const userScope = require("./userScope/schema");

module.exports.schema = buildSchema(`
    ${userSchema}

    ${scopeSchema}

    ${contactSchema}

    ${addressSchema}

    ${courseSchema}
    
    ${userScope}

    type RootQuery {
        searchUser(id: Int!): User!
        listUsers(creator: Int, all: Boolean): [User!]
        login(email: String!, password: String!): Token!

        searchScope(name: String!): Scope!
        listScopes: [Scope!]

        listUserScopes: [UserScope!]

        listContacts(userId: Int!): [Contact!]

        listAddresses(userId: Int!): [Address!]

        searchCourses(params: CourseSearch!): [Course!]
        listCourses(private: Boolean!): [Course!]
    }   

    type RootMutation {
        createUser(params: UserInput!): User!
        removeUser(id: Int!): String!
        updateUser(params: UserUpdateInput!): User!

        createScope(params: ScopeInput!): Scope!
        removeScope(name: String!): String!
        updateScope(params: ScopeUpdate!): Scope!

        createUserScope(scopeId: Int!, userId: Int!): String!
        removeUserScope(scopeId: Int!, userId: Int!): String!

        createContact(params: ContactInput!): Contact!
        removeContact(id: Int!): String!
        updateContact(params: ContactUpdate!): Contact!

        createAddress(params: AddressInput!): Address!
        removeAddress(id: Int!): String!
        updateAddress(params: AddressUpdate!): Address!

        createCourse(params: CourseInput!): Course!
        removeCourse(id: Int!): String!
        updateCourse(params: CourseUpdate!): Course!
        signCourse(courseId: Int!, userId: Int!): String!
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

const courseResolvers = require("./course/resolvers");

const userScopeResolvers = require("./userScope/resolvers");

module.exports.resolvers = {
  ...userResolvers,
  ...scopeResolvers,
  ...contactResolvers,
  ...addressResolvers,
  ...courseResolvers,
  ...userScopeResolvers
};
