'use strict';

const { Comment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'CommentImages';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "CommentImages";
        return queryInterface.bulkInsert(options, [
            {
                commentId: 1,
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
            },
            {
                commentId: 2,
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
            },
            {
                commentId: 3,
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
            },
            {
                commentId: 4,
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "CommentImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            commentId: { [Op.in]: [1, 2, 3, 4] }
        })
    }
}
