module.exports = `
    type Class {
        id: Int
        vacancies: Int
        instructor: Int
        room: String
        shift: String
        createdAt: String
        updatedAt: String
        courseId: Int
    }

    input ClassInput {
        vacancies: Int!
        instructor: Int!
        room: String!
        shift: String!
        courseId: Int!
    }

    input ClassUpdateInput {
        id: Int
        vacancies: Int
        instructor: Int
        room: String
        shift: String
        courseId: Int
    }

    input ClassSearch {
        vacancies: Int
        instructor: Int
        room: String
        shift: String
        courseId: Int
    }
`;
