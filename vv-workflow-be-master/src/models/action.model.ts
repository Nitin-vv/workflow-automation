
module.exports = ( sequelize: any, DataTypes: any ) => {
    const ACTION = sequelize.define(
        'ACTION',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            accountid: DataTypes.INTEGER,
            title: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            tableName: 'actions',
            timestamps: true,
        },
    );
    return ACTION;
};
