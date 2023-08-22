
module.exports = ( sequelize: any, DataTypes: any ) => {
    const WORKFLOWSCHEDULES = sequelize.define(
        'WORKFLOWSCHEDULES',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            days: DataTypes.STRING,
            starttime: DataTypes.STRING,
            endtime: DataTypes.STRING,
            workflowid: DataTypes.INTEGER,
            scheduletype: DataTypes.INTEGER,
            userid: DataTypes.INTEGER,
            accountid: DataTypes.INTEGER,
        },
        {
            tableName: 'workflow-schedules',
            timestamps: true,
        },
    );
    return WORKFLOWSCHEDULES
};
