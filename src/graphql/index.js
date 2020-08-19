const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../db/models');
const emailUtil = require('../services/email/mail-gun');
const createLoader = require('./dataloaders');
const { Op } = require("sequelize");
const config = require('../config');

const corsOptions = {
  origin: config.api.getCors()
}

const server = new ApolloServer({
  cors: corsOptions, 
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // create new loader instances for every request
    const dataloader = createLoader();
    return {
      models, Op, dataloader, emailUtil
    }
  },
  introspection: config.apollo.getIntrospection(),
  playground: config.apollo.getPlayground(),
})
// server.applyMiddleware()

module.exports = server; 

