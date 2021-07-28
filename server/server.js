const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

app.use(cors());

app.use(
  '/api',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use('/', (req, res) => {
  res.send('Welcome to GraphQL server. Use GraphQL endpoint at /graphql');
});

app.listen(3001, () => {
  console.log('Server started, now listening for requests on port 3001');
});
