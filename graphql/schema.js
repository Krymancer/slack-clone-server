import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname), './schemas/*.graphql'));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname), './resolvers'));

console.log(typeDefs)

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
});

export default server;