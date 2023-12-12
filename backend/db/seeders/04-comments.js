'use strict';

const { Comment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Comments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                postId: 2,
                comment: 'This is comment 1'
            },
            {
                userId: 2,
                postId: 2,
                comment: 'This is comment 2'
            },
            {
                userId: 1,
                postId: 3,
                comment: 'This is comment 3'
            },
            {
                userId: 3,
                postId: 1,
                comment: 'This is comment 4'
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3] }
        })
    }
}
