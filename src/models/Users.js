const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            lowercase: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}