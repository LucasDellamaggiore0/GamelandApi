const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('Games', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false,
        },
        released_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}
