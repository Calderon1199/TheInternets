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
                comment: "Great post! I've had success using React and Node.js in my projects. Have you considered incorporating TypeScript for enhanced type safety?"
            },
            {
                userId: 2,
                postId: 2,
                comment: "Interesting read! I've found that choosing the right database, like MongoDB or PostgreSQL, can greatly impact a project. What's your take on database selection in modern tech stacks?"
            },
            {
                userId: 3,
                postId: 2,
                comment: "Thanks for sharing! I've been exploring serverless architectures lately. What are your thoughts on incorporating AWS Lambda or Azure Functions into a tech stack for scalability?"
            },
            {
                userId: 1,
                postId: 2,
                comment: "Insightful post! I've been using Docker for containerization. How do you see container orchestration tools like Kubernetes fitting into a well-rounded tech stack?"
            },
            {
                userId: 2,
                postId: 2,
                comment: "This post covers key aspects of tech stacks well! I've been leaning towards using Next.js for my React applications. What are your thoughts on incorporating Next.js for frontend development?"
            },
            {
                userId: 1,
                postId: 2,
                comment: "Excellent post! I've been using pandas and NumPy for data manipulation and analysis in Python. Have you explored any lesser-known libraries for specific tasks, like scikit-learn for machine learning?"
            },
            {
                userId: 2,
                postId: 2,
                comment: "Insightful read! Python's ecosystem is vast. Lately, I've been intrigued by the simplicity of requests for HTTP handling. What are your go-to Python libraries for web development or API integrations?"
            },
            {
                userId: 3,
                postId: 2,
                comment: "Thanks for sharing! Python's rich library ecosystem is a game-changer. Recently, I've been exploring Flask for web development. Any thoughts on using Flask versus Django for building web applications?"
            },
            {
                userId: 1,
                postId: 46,
                comment: "Love this topic! My dream car has always been a classic Porsche 911. The timeless design and exhilarating performance make it my ultimate choice. What's your dream car and why?"
            },
            {
                userId: 1,
                postId: 46,
                comment: "Great post! I've been dreaming about owning a Tesla Model S. The combination of cutting-edge technology, electric performance, and sleek design is simply unmatched. What features do you prioritize in your dream car?"
            },
            {
                userId: 2,
                postId: 46,
                comment: "Thanks for sharing! My dream car changes every now and then, but currently, I'm fascinated by the Lamborghini Aventador. The combination of raw power and striking aesthetics is simply breathtaking. What's your ever-changing dream car?"
            },
            {
                userId: 3,
                postId: 46,
                comment: "Fascinating topic! My dream car has always been the classic Ford Mustang. The iconic design, powerful engine, and the sense of American muscle make it stand out. What do you think makes a dream car truly special?"
            },
            {
                userId: 3,
                postId: 46,
                comment: "This is such a fun topic! Dreaming of a Range Rover for its luxury and versatility. It strikes a perfect balance between style and functionality. What factors are most important to you when choosing your dream car?"
            },
            {
                userId: 1,
                postId: 87,
                comment: "Amazing post! I've always been fascinated by the intelligence of dolphins. Their social behaviors and problem-solving abilities are truly remarkable. What's your favorite underwater creature and why?"
            },
            {
                userId: 2,
                postId: 87,
                comment: "Thanks for sharing this! The diversity of marine life is incredible. Personally, I'm intrigued by the vibrant colors of coral reefs and the unique species that inhabit them. Do you have a favorite marine ecosystem or underwater habitat?"
            },
            {
                userId: 2,
                postId: 87,
                comment: "Great topic! Sharks have always captured my interest. Their sleek designs and powerful presence in the ocean make them truly fascinating. Which underwater species do you find most captivating?"
            },
            {
                userId: 3,
                postId: 87,
                comment: "Fascinating read! The deep-sea creatures discovered in recent years are like something out of a sci-fi movie. The adaptability and mysterious nature of these creatures are mind-boggling. Do you have a favorite deep-sea inhabitant?"
            }
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
