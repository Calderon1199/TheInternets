'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Comment.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' })
            Comment.belongsTo(models.User, { foreignKey: 'userId' })
            Comment.hasMany(models.CommentImage, { foreignKey: 'commentId', onDelete: 'CASCADE' });
        }
    }
    Comment.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id'
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
