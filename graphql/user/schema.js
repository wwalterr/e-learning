module.exports = `
    type User {
        id: Int
        email: String!
        password: String
        cpf: String
        matriculation: String!
        firstName: String
        secondName: String
        createdAt: String
        updatedAt: String
        creator: Int
    }

    input UserInput {
        email: String!
        password: String!
        cpf: String
        matriculation: String!
        firstName: String
        secondName: String
        creator: Int!
    }
`;
