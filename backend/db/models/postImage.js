'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class PostImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PostImage.init({
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        preview: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PostImage',
    });
    return PostImage;
};
