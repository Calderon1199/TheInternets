'use strict';

const { Post, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Posts';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                categoryId: 2,
                title: 'How to code.',
                postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            {
                userId: 2,
                categoryId: 2,
                title: 'How not to code.',
                postText: "Don't push it all to main..."
            },
            {
                userId: 3,
                categoryId: 3,
                title: 'Why is coding hard?',
                postText: "It's not hard you're just lazy"
            },
            {
                userId: 4,
                categoryId: 4,
                title: 'I hope this work',
                postText: 'It has to'
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3, 4] }
        })
    }
}
