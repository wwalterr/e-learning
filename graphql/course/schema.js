module.exports = `
    type Course {
        id: Int
        title: String
        description: String
        start: String
        end: String
        creator: Int
        private: Boolean
    }

    input CourseSearch {
        id: Int
        title: String
        start: String
        end: String
        creator: Int
    }

    input CourseInput {
        title: String
        description: String
        start: String
        end: String
        creator: Int
        private: Boolean
    }

    input CourseUpdate {
        title: String
        description: String
        start: String
        end: String
        private: Boolean
    }
`;
