"use strict";
module.exports = (sequelize, DataTypes) => {
    const SignUp = sequelize.define('SignUp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: true,
    });
    return SignUp;
};
