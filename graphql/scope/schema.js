module.exports = `
    type Scope {
        id: Int
        name: String
        description: String
        createdAt: String
        updatedAt: String
    }

    input ScopeInput {
        name: String!
        description: String
    }

    input ScopeUpdate {
        name: String
        description: String
    }
`;
