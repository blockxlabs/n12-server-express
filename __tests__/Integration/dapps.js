const { ApolloServer } = require('apollo-server');

const typeDefs = require('../../src/graphql/schemas');
const resolvers = require('../../src/graphql/resolvers');
const models = require('../../src/db/models');
const dataloader = require('../../src/graphql/dataloaders');
const { Op } = require("sequelize");
const uuid = require('uuid').v4;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, Op, dataloader },
  mocks: {
    String: () => 'mock string',
    Notifications: () => ({ uuid: 'fake uuid', name: 'fake name' })
  },
})

const { createTestClient } = require('apollo-server-testing');
const { query, mutate } = createTestClient(server);
const { gql } = require('apollo-server')
const GET_DAPPS = gql`
  query {
    allDApps{
      uuid,
      name,
      description,
      logoUrl,
      Notifications{
        uuid,
        name
      }
    }
  }
`;

test("apollo test", async (done) => {
  const res = await query({ query: GET_DAPPS });
  res.data.allDApps.map(item => {
    expect(item.name).toEqual('mock string');
    expect(item.uuid).toEqual('mock string');
    expect(item.description).toEqual('mock string');
    expect(item.logoUrl).toEqual('mock string');
    item.Notifications.map(noti => {
      expect(noti).toEqual({ uuid: 'fake uuid', name: 'fake name' });
    });
  });
  done();
})