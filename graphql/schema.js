import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import jwt from 'jsonwebtoken';

import { refreshTokens } from '../auth';
import models from '../models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const secret = '94150bbf31149883db2acc58bd9fca79cf70771e019fad224ca056adfcd99e10';
const secret2 = 'b1ef4c83bf17e8085b40d12a2f3deae4d7fa7e1592034bd97b33de85309f5f4f';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {

        const token = req.headers['x-token'];

        if (token) {
            try {
                const { user } = jwt.verify(token, secret);
                req.user = user;
            } catch (error) {
                const refreshToken = await req.headers['x-refresh-token'];
                const newTokens = refreshTokens(token, refreshToken, models, secret, secret2);
                if (newTokens.token && newTokens.refreshToken) {
                    req.set('Acess-Control-Expose-Headers', 'x-token', 'x-refresh-token');
                    req.set('x-token', newTokens.token);
                    req.set('x-refresh-token', newTokens.refreshToken)
                }
                req.user = newTokens.user;
            }
        }

        return {
            models,
            user: req.user,
            SECRET: secret,
            SECRET2: secret2,
        }
    },
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
});

export default server;