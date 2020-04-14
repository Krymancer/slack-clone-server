export default (sequelize, DataTypes) => {
    const Team = sequelize.define(
        'team',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    len: { args: [5, 50], msg: "The name needs to be between 5 and 50 characters long" },
                }
            },
        },
        { underscored: true },
    );

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
            },
        });
        Team.belongsTo(models.User, {
            foreignKey: 'owner',
        });
    };

    return Team;
};