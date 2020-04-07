import express from 'express';

import server from './graphql/schema.js';
import models from './models';

const app = express();


server.applyMiddleware({ app });
const PORT = 4000 || process.env;

models.sequelize.sync({ force: true}).then(error => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/graphql`);
    });
});

export default app;