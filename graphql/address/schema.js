module.exports = `
    type Address {
        id: Int
        street: String
        number: Int
        complement: String
        city: String
        state: String
        zipCode: String
        userId: Int
        createdAt: String
        updatedAt: String
    }

    input AddressInput {
        street: String
        number: Int
        complement: String
        city: String
        state: String
        zipCode: String
        userId: Int
    }

    input AddressUpdate {
        id: Int
        street: String
        number: Int
        complement: String
        city: String
        state: String
        zipCode: String
    }
`;
