const DataLoader = require('dataloader');
const models = require('../../db/models');

const dappsLoaderInit = () => {
  return new DataLoader((dAppUuids) => {
    return models.DApp.findAll({
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
}

module.exports = dappsLoaderInit;
    
// return dappLoader.load(notification.dAppUuid);