'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Group.belongsTo(models.User, { foreignKey: 'userId' });
            Group.hasMany(models.Post, { foreignKey: 'categoryId' });
        }
    }
    Group.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 30],
                noSpaces(value) {
                    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                        throw new Error('Name can only contain numbers, letters, and underscores.');
                    }
                },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                noLeadingSpace(value) {
                    if (value && value.startsWith(' ')) {
                        throw new Error('Description cannot start with a space.');
                    }
                },
            }
        }
    }, {
        sequelize,
        modelName: 'Group',
    });
    return Group;
};
