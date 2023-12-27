'use strict';

const { Comment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'PostImages';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "PostImages";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://loremflickr.com/640/480/computers?lock=8593428084424704',
                postId: 1,
                preview: true
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=8363757407305728',
                postId: 1,
                preview: false
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=2392958305304576',
                postId: 1,
                preview: false
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=3244580694654976',
                postId: 2,
                preview: true
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=7860436445691904',
                postId: 2,
                preview: false
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=7439085719257088',
                postId: 3,
                preview: true
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=3464180269056000',
                postId: 3,
                preview: false
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=8911913924689920',
                postId: 4,
                preview: true
            },
            {
                postId: 5,
                url: "https://www.rd.com/wp-content/uploads/2018/12/50-Funny-Animal-Pictures-That-You-Need-In-Your-Life-2.jpg",
                preview: true
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "PostImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            postId: { [Op.in]: [1, 2, 3] }
        })
    }
}
