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
		time: String
    }

    input ClassInput {
        vacancies: Int!
        instructor: Int!
        room: String!
        shift: String!
        courseId: Int!
        time: String!
    }

    input ClassUpdateInput {
        id: Int!
        vacancies: Int
        instructor: Int
        room: String
        shift: String
		courseId: Int
		time: String
    }

    input ClassSearch {
		id: Int
        vacancies: Int
        instructor: Int
        room: String
        shift: String
		courseId: Int
		time: String
    }
`;
