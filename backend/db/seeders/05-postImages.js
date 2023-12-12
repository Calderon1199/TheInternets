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
                postId: 3,
                url: "https://gratisography.com/wp-content/uploads/2023/06/gratisography-flying-squirrel-free-stock-photo-800x525.jpg",
                preview: true
            },
            {
                postId: 1,
                url: "https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_640.jpg",
                preview: true
            },
            {
                postId: 1,
                url: "https://i.pinimg.com/736x/7e/70/9c/7e709cb869fd392935815d90c287822e.jpg",
                preview: false
            },
            {
                postId: 2,
                url: "https://i.pinimg.com/736x/63/32/fc/6332fc61c7ec917521c2994d5386636b.jpg",
                preview: true
            },
            {
                postId: 3,
                url: "https://www.rd.com/wp-content/uploads/2018/12/50-Funny-Animal-Pictures-That-You-Need-In-Your-Life-2.jpg",
                preview: false
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
