const DataLoader = require('dataloader');
const models = require('../../db/models');

const dappLoader = new DataLoader((dAppUuids) => {
  return models.DApps.findAll({
    where: { uuid: dAppUuids }
  })
  .then(dapps => {
    const dappsById = dapps.reduce((value, dapp) => {
      value[dapp.uuid] = dapp;
      return value;
    }, {});
    const result = dAppUuids.map(id => {
      return dappsById[id];
    });
    return result;
  });
});  

module.exports = dappLoader;
    
// return dappLoader.load(notification.dAppUuid);