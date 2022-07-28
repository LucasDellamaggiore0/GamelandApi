const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Images', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}