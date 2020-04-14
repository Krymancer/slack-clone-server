import { tryLogin } from '../../auth';

export default {
    Query: {
        getUser: (parent, args, context) => context.models.User.findOne({ where: { id: args.id } }),
        allUsers: (parent, args, context) => context.models.User.findAll(),
    },
    Mutation: {
        login: (parent, { email, password }, { models, SECRET, SECRET2 }) => {
            return tryLogin(email,password,models, SECRET, SECRET2);
        },
        register: async (parent, args, { models }) => {
            try {

                const user = await models.User.create(args);

                return {
                    ok: true,
                    user: user,
                };

            } catch (error) {
                return {
                    ok: false,
                    errors: error.errors,
                }
            }
        },
    },
};