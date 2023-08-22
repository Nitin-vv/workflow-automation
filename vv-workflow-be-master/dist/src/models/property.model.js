"use strict";
// Import Sequelize and define your model
const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accountid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        regex: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        tableName: 'property',
        timestamps: true,
    });
    return Property;
};
