'use strict';
const { Model } = require('sequelize');

let options = {};
options.tableName = 'Likes';
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Like.belongsTo(models.Post, { foreignKey: "postId" })
        }
    }

    Like.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Users',
                    schema: options.schema
                },
                key: 'id'
            },
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Posts',
                    schema: options.schema
                },
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        isLiked: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};
