'use strict';

let options = {};
options.tableName = 'CommentImages';
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(options, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            commentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'Comments',
                        schema: options.schema
                    },
                    key: 'id'
                },
            },
            url: {
                type: Sequelize.STRING,
                defaultValue: "",
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(options);
    }
};
