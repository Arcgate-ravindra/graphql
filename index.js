const express = require('express');
const app = express();
const { expressMiddleware } =  require('@apollo/server/express4');
const createApolloServer = require('./config/graphql.config');





app.use(express.json());


(async () => {
    const server = createApolloServer();
    await server.start();
    app.use('/graphql', expressMiddleware(server))
    app.listen(3000, () => console.log("server is running on the port 3000"))
})();





  






