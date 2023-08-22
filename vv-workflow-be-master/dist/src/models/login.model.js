"use strict";
module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('Login', {
        // id: {
        //   type: DataTypes.INTEGER,
        //   primaryKey: true,
        //   autoIncrement: true,
        //   allowNull: false,
        // },
        // name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: false,
    });
    return Login;
};
