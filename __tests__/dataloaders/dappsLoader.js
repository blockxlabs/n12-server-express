const DAppLoader = require('../../src/graphql/dataloaders/dappsLoader');
const models = require('../../src/db/models');
const uuid = require('uuid').v4;

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

test("apollo test", async (done) => {

  const mockDAppsFindAll = jest
    .spyOn(models.DApps, 'findAll')
    .mockImplementation(() => Promise.resolve(fixtures.allDapps));
  // load with reversed order
  const promise1 = DAppLoader.load(fixtures.allDapps[1].uuid);
  const promise2 = DAppLoader.load(fixtures.allDapps[0].uuid);
  const result = await Promise.all([promise1, promise2]);
  expect(mockDAppsFindAll).toHaveBeenCalledTimes(1);
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual(fixtures.allDapps[1]);
  expect(result[1]).toEqual(fixtures.allDapps[0]);
  mockDAppsFindAll.mockRestore();
  done();
  
})