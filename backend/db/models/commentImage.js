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
            // define association here
        }
    }
    CommentImage.init({
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
