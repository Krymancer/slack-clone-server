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
        console.log(`\n################################ END INIT ################################\n`);
        console.log(`GraphQL URL: http://localhost:${PORT}/graphql`);
        console.log('\n##########################################################################\n')
    });
});

export default app;