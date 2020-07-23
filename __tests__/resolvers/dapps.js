const resolvers = require('../../src/graphql/resolvers');
const uuid = require('uuid').v4;
const models = require('../../src/db/models');
const fixtures = {
  allDapps: [
    {
      uuid: uuid(),
      name: uuid()
    },
    {
      uuid: uuid(),
      name: uuid()
    }
  ]
};

test("Test Query allDApps", async (done) => {

  const mockDAppsFindAll = jest
    .spyOn(models.DApps, 'findAll')
    .mockImplementation(() => Promise.resolve(fixtures.allDapps));

  const allDAppsQuery = await resolvers.Query.allDApps({}, {}, { models });

  expect(mockDAppsFindAll).toHaveBeenCalledTimes(1);
  expect(allDAppsQuery).toEqual(fixtures.allDapps);
  
  mockDAppsFindAll.mockRestore();
  done();

});

test("Test Query dApps", async (done) => {

  const mockDAppsFindOne = jest
    .spyOn(models.DApps, 'findByPk')
    .mockImplementation(uuid => Promise.resolve(fixtures.allDapps.find(item => item.uuid == uuid)));

  const oneDAppsQuery = await resolvers.Query.dApps({}, { uuid: fixtures.allDapps[0].uuid }, { models });

  expect(mockDAppsFindOne).toHaveBeenCalledTimes(1);
  expect(oneDAppsQuery).toEqual(fixtures.allDapps[0]);

  mockDAppsFindOne.mockRestore();
  done();

});

test("Test DApps Notifications", async (done) => {
  const mockLoad = jest.fn();
  const mockDataLoader = {
    notificationsLoader: {
      load: mockLoad
    }
  };
  const mockNotification = { uuid: uuid() };
  await resolvers.DApps.Notifications(mockNotification, {}, { dataloader: mockDataLoader });

  expect(mockLoad).toHaveBeenCalledTimes(1);
  expect(mockLoad.mock.calls[0][0]).toEqual(mockNotification.uuid);
  done();
});