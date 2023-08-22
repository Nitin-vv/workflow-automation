"use strict";
module.exports = (sequelize, DataTypes) => {
    const SMS = sequelize.define('SMS', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: DataTypes.STRING,
        template: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        userid: DataTypes.INTEGER,
        accountid: DataTypes.INTEGER
    }, {
        tableName: 'sms-templates',
        timestamps: true,
    });
    return SMS;
};
