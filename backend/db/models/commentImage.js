'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class CommentImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CommentImage.belongsTo(models.Comment, { foreignKey: 'commentId', sourceKey: 'id', onDelete: 'CASCADE' });
        }
    }
    CommentImage.init({
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Comments',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'CommentImage',
    });
    return CommentImage;
};
