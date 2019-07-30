module.exports = `
    type Progress {
        id: Int
        attendance: Int
        grade: Float
        createdAt: String
        updatedAt: String
        classUserId: Int
    }

    input ProgressInput {
        attendance: Int
        grade: Float
        classUserId: Int
    }

    input ProgressUpdateInput {
        id: Int
        attendance: Int
        grade: Float
        classUserId: Int
    }

    input ProgressSearch {
        id: Int
        attendance: Int
        grade: Float
        createdAt: String
        updatedAt: String
        classUserId: Int
    }
`;
