module.exports = `
    type User {
        id: Int
        email: String!
        password: String
        cpf: String
        matriculation: String!
        firstName: String!
        secondName: String!
    }

    input UserInput {
        email: String!
        password: String!
        cpf: String
        matriculation: String!
        firstName: String!
        secondName: String!
    }
`;
