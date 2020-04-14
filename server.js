import express from 'express';
import cors from 'cors';

import server from './graphql/schema.js';
import models from './models';

const app = express();

app.use(cors('*'));

server.applyMiddleware({ app });

const PORT = 4000 || process.env;

models.sequelize.sync().then(error => {
    app.listen(PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `\n################################ END INIT ################################\n`);
        console.log('\x1b[33m%s\x1b[0m', `GraphQL URL: http://localhost:${PORT}/graphql`);
        console.log('\x1b[36m%s\x1b[0m','\n##########################################################################\n')
    });
});

export default app;