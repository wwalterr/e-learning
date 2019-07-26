module.exports = `
    type Contact {
        id: Int
        email: String
        phone: String
        createdAt: String
        updatedAt: String
        userId: Int
    }

    input ContactInput {
        userId: Int!
        email: String
        phone: String
    }

    input ContactUpdate {
        id: Int
        email: String
        phone: String
    }
`;
