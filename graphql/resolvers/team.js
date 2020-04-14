import requiresAuth from '../../permission';

export default {
    Mutation: {
        createTeam: requiresAuth.createResolver(async (param, args, context) => {
            try {
                await context.models.Team.create({ ...args, owner: context.user.id });
                return {
                    ok: true,
                };
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    errors: error.errors,
                };
            }
        }),
    },
};