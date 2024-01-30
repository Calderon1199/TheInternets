'use strict';

let options = {};
options.tableName = 'Likes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Likes";
        return queryInterface.bulkInsert(options, [
            { userId: 2, postId: 1, isLiked: false },
            { userId: 2, postId: 2, isLiked: false },
            { userId: 3, postId: 3, isLiked: true },
            { userId: 1, postId: 4, isLiked: true },
            { userId: 1, postId: 5, isLiked: false },
            { userId: 3, postId: 6, isLiked: true },
            { userId: 2, postId: 7, isLiked: false },
            { userId: 3, postId: 8, isLiked: false },
            { userId: 3, postId: 9, isLiked: false },
            { userId: 2, postId: 10, isLiked: false },
            { userId: 1, postId: 11, isLiked: false },
            { userId: 2, postId: 12, isLiked: true },
            { userId: 3, postId: 13, isLiked: false },
            { userId: 3, postId: 14, isLiked: true },
            { userId: 1, postId: 15, isLiked: true },
            { userId: 1, postId: 16, isLiked: true },
            { userId: 1, postId: 17, isLiked: true },
            { userId: 3, postId: 18, isLiked: false },
            { userId: 3, postId: 19, isLiked: true },
            { userId: 3, postId: 20, isLiked: false },
            { userId: 1, postId: 21, isLiked: true },
            { userId: 1, postId: 22, isLiked: true },
            { userId: 3, postId: 23, isLiked: true },
            { userId: 3, postId: 24, isLiked: false },
            { userId: 1, postId: 25, isLiked: true },
            { userId: 1, postId: 26, isLiked: false },
            { userId: 3, postId: 27, isLiked: true },
            { userId: 2, postId: 28, isLiked: false },
            { userId: 1, postId: 29, isLiked: false },
            { userId: 1, postId: 30, isLiked: false },
            { userId: 1, postId: 31, isLiked: false },
            { userId: 3, postId: 32, isLiked: false },
            { userId: 1, postId: 34, isLiked: false },
            { userId: 1, postId: 35, isLiked: false },
            { userId: 2, postId: 36, isLiked: false },
            { userId: 3, postId: 37, isLiked: false },
            { userId: 1, postId: 38, isLiked: true },
            { userId: 3, postId: 39, isLiked: true },
            { userId: 2, postId: 40, isLiked: false },
            { userId: 2, postId: 41, isLiked: false },
            { userId: 1, postId: 42, isLiked: true },
            { userId: 1, postId: 43, isLiked: false },
            { userId: 1, postId: 44, isLiked: true },
            { userId: 1, postId: 45, isLiked: false },
            { userId: 2, postId: 46, isLiked: false },
            { userId: 1, postId: 47, isLiked: true },
            { userId: 1, postId: 48, isLiked: true },
            { userId: 2, postId: 49, isLiked: false },
            { userId: 3, postId: 50, isLiked: true }

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Likes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3] }
        })
    }
}
