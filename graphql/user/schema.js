module.exports = `
    type Creator {
        id: Int!
        email: String
        matriculation: String
    }

    type User {
        id: Int
        email: String
        password: String
        cpf: String
        matriculation: String
        firstName: String
        secondName: String
        createdAt: String
        updatedAt: String
        creator: Creator
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
    
    input UserUpdateInput {
        id: Int!
        password: String
        cpf: String
        matriculation: String
        firstName: String
        secondName: String
    }

    type Token {
        userId: Int!
        token: String!
        tokenExpiration: Int!,
        scopes: [String!]
    }
`;
