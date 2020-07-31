const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../db/models');
const dataloader = require('./dataloaders');
const emailUtil = require('../services/email/mail-gun');
const { Op } = require("sequelize");

const server = new ApolloServer({
  cors: true, 
  typeDefs,
  resolvers,
  context: { models, Op, dataloader, emailUtil },
})
// server.applyMiddleware()

module.exports = server; 

