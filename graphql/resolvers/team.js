import requiresAuth from '../../permission';

export default {
    Query: {
        allTeams: requiresAuth.createResolver(async (param, args, { models, user }) => {
            return models.Team.findAll({ where: { owner: user.id } }, { raw: true });
        }),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (param, args, { models, user }) => {
            try {
                const team = await models.Team.create({ ...args, owner: user.id });
                await   models.Channel.create({ name: 'general', public: true, teamId: team.id });
                return {
                    ok: true,
                    team: team,
                };
            } catch (error) {
                return {
                    ok: false,
                    errors: error.errors,
                };
            }
        }),
    },
    Team: {
        channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { teamId: id } }),
    },
};