module.exports = `
    scalar Date
    
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
        issuedAt: Date!
        expireAt: Date!
        tokenExpiration: Int!,
        scopes: [String!],
        firstName: String!
    }
`;
