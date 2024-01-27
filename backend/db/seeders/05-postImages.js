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
                url: 'https://i.pinimg.com/736x/8e/23/1e/8e231e0aa5c7acb23e299ae2f4889fbe.jpg',
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
                url: 'https://s3-alpha.figma.com/hub/file/4338177571/204c712d-2a40-4422-820a-1981e15fdccf-cover.png',
                postId: 2,
                preview: true
            },
            {
                url: 'https://loremflickr.com/640/480/computers?lock=7860436445691904',
                postId: 2,
                preview: false
            },
            {
                url: 'https://cdn.hackr.io/uploads/posts/large/1638688885bMPn2hGMSg.png',
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
            {
                postId: 25,
                url: "https://cdn.mos.cms.futurecdn.net/GfzwEBy5XYUZnfV5tkZ7dH-1200-80.jpg",
                preview: true
            },
            {
                postId: 66,
                url: "https://www.hcbh.org/media/rdynpnx4/nutrition.png",
                preview: true
            },
            {
                postId: 42,
                url: "https://heartautocare.com/wp-content/uploads/2023/11/Breaking-Down-the-Costs-How-Much-Car-Maintenance-Per-Year-is-Necessary.png",
                preview: true
            },
            {
                postId: 84,
                url: "https://content.dogagingproject.org/wp-content/uploads/2023/11/Blog-Cover-Different-Dogs.png",
                preview: true
            },
            {
                postId: 46,
                url: "https://www.porschedriving.com/los-angeles/-/media/porschedrivinglosangeles/backgrounds/pec-landing-page/desktop/01122024_pecla_la-landing-page_gt3-rs-v-manthey_rotating-hero-banner_desktop.png",
                preview: true
            },
            {
                postId: 12,
                url: "https://www.projecthope.org/wp-content/uploads/2022/11/Cugenang-Situation-22-Nov-2022-4.png",
                preview: true
            },
            {
                postId: 56,
                url: "https://blog.currentcatalog.com/wp-content/uploads/2020/02/AdobeStock_178470772-1024x700.jpeg",
                preview: true
            },
            {
                postId: 92,
                url: "https://mylifelivingabroad.com/wp-content/uploads/2022/01/Organiser-son-road-trip.png",
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
