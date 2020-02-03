const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ProductAPI = require('./datasources/product');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productAPI: new ProductAPI()
  })
});

console.log('heroku port: '+process.env.PORT);

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});