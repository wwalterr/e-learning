// Schema
const { buildSchema } = require("graphql");

const userSchema = require("./user/schema");

const scopeSchema = require("./scope/schema");

const contactSchema = require("./contact/schema");

const addressSchema = require("./address/schema");

const courseSchema = require("./course/schema");

const userScopeSchema = require("./userScope/schema");

const courseUserSchema = require("./courseUser/schema");

const classSchema = require("./class/schema");

const classUserSchema = require("./classUser/schema");

const progressSchema = require("./progress/schema");

module.exports.schema = buildSchema(`
    ${userSchema}

    ${scopeSchema}

    ${contactSchema}

    ${addressSchema}

    ${courseSchema}
    
    ${userScopeSchema}

    ${courseUserSchema}

    ${classSchema}

    ${classUserSchema}

    ${progressSchema}

    type RootQuery {
        searchUser(id: Int!): User!
        listUsers(creator: Int, all: Boolean): [User!]
        login(email: String!, password: String!): Token!

        searchScope(name: String!): Scope!
        listScopes: [Scope!]

        listUserScopes(userId: Int, scopeId: Int): [UserScope!]

        listContacts(userId: Int!): [Contact!]

        listAddresses(userId: Int!): [Address!]

        searchCourses(params: CourseSearch!): [Course!]
        listCourses(private: Boolean!): [Course!]

        listCourseUsers(userId: Int, courseId: Int): [CourseUser!]

        listClasses(params: ClassSearch!): [Class!]

        listClassUsers(userId: Int, classId: Int): [ClassUser!]

        listProgresses(params: ProgressSearch!): [Progress!]
    }   

    type RootMutation {
        createUser(params: UserInput!): User!
        removeUser(id: Int!): String!
        updateUser(params: UserUpdateInput!): User!
        resetUserPassword(email: String!): String!

        createScope(params: ScopeInput!): Scope!
        removeScope(name: String!): String!
        updateScope(params: ScopeUpdate!): Scope!

        createUserScopeBulk(scopesNames: [String!], scopesIds: [Int!], userId: Int!): String!
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
        
        createCourseUser(courseId: Int!, userId: Int!): String!
        removeCourseUser(courseId: Int!, userId: Int!): String!

        createClass(params: ClassInput!): Class!
        removeClass(id: Int!): String!
        updateClass(params: ClassUpdateInput!): Class!

        createClassUser(classId: Int!, userId: Int!): String!
        removeClassUser(classId: Int!, userId: Int!): String!

        createProgress(params: ProgressInput!): Progress!
        removeProgress(id: Int!): String!
        updateProgress(params: ProgressUpdateInput!): Progress!
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

const courseUserResolvers = require("./courseUser/resolvers");

const classResolvers = require("./class/resolvers");

const classUserResolvers = require("./classUser/resolvers");

const progressResolvers = require("./progress/resolvers");

module.exports.resolvers = {
  ...userResolvers,
  ...scopeResolvers,
  ...contactResolvers,
  ...addressResolvers,
  ...courseResolvers,
  ...userScopeResolvers,
  ...courseUserResolvers,
  ...classResolvers,
  ...classUserResolvers,
  ...progressResolvers
};
