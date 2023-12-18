'use strict';

const { Group, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Groups';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Groups";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                name: 'computer community',
                description: 'This is the computer community.'
            },
            {
                userId: 2,
                name: 'cybersecurity community',
                description: 'This is the cybersecurity community.'
            },
            {
                userId: 2,
                name: 'dev ops community',
                description: 'This is the dev ops community.'
            },
            {
                userId: 3,
                name: 'javascript community',
                description: 'This is the js community.'
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Groups";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3, 5] }
        })
    }
}
