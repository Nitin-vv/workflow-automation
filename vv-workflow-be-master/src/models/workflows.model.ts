
module.exports = ( sequelize: any, DataTypes: any ) => {
    const WORKFLOW = sequelize.define(
        'WORKFLOW',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: DataTypes.STRING,
            scheduletime: DataTypes.INTEGER,
            workflow: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            userid: DataTypes.INTEGER,
            accountid: DataTypes.INTEGER,
        },
        {
            tableName: 'workflows',
            timestamps: true,
        },
    );
    return WORKFLOW
};
