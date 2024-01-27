'use strict';
const { Model } = require('sequelize');

let options = {};
options.tableName = 'Posts';
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.belongsTo(models.Group, { foreignKey: "categoryId" })
            Post.belongsTo(models.User, { foreignKey: "userId" })
            Post.hasMany(models.PostImage, { foreignKey: "postId", sourceKey: 'id', onDelete: 'CASCADE' })
            Post.hasMany(models.Comment, { foreignKey: "postId", sourceKey: 'id', onDelete: 'CASCADE' })
        }
    }

    Post.init({
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Groups',
                    schema: options.schema
                },
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                hasNoLeadingTrailingSpace(value) {
                    if (value && (value.startsWith(' ') || value.endsWith(' '))) {
                        throw new Error('Title cannot start or end with a space.');
                    }
                },
            }
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                hasNoLeadingTrailingSpace(value) {
                    if (value && (value.startsWith(' ') || value.endsWith(' '))) {
                        throw new Error('Title cannot start or end with a space.');
                    }
                },
            }
        }
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
