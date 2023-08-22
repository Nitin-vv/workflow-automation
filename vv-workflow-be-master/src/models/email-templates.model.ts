
module.exports = ( sequelize: any, DataTypes: any ) => {
    const EMAIL = sequelize.define(
        'EMAIL',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userid: DataTypes.INTEGER,
            accountid: DataTypes.INTEGER,
            title: DataTypes.STRING,
            subject: DataTypes.STRING,
            body: DataTypes.TEXT( 'long' ),
            status: DataTypes.BOOLEAN,
        },
        {
            tableName: 'email-templates',
            timestamps: true,
        },
    );
    return EMAIL;
};
