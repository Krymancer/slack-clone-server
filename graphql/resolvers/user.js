import bcrypt from 'bcrypt';
import _ from 'lodash';

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
        register: async (parent, { password, ...otherArgs }, { models }) => {
            try {

                if (password.length < 5 || password.length > 100) {
                    return {
                        ok: false,
                        errors: [
                            {
                                path: 'password',
                                message: 'The password needs to be between 5 and 100 characters long',
                            },
                        ],
                    };
                }

                const hashedPassword = await bcrypt.hash(password, 12);

                const user = await models.User.create({ ...otherArgs, password: hashedPassword });

                return {
                    ok: true,
                    user: user,
                };
            } catch (errors) {
                return {
                    ok: false,
                    errors: errors.errors,
                }
            }
        },
    },
};