"use strict";
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        userid: {
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
    return Users;
};
