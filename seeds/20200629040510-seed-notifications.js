module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('notifications', [
      {
        uuid: '00000001-2c32-4564-8d54-e00d4001b744',
        created_at: new Date(),
        updated_at: new Date(),
        name: 'Name 1',
        short_desc: 'Short Description 1',
        long_desc: 'Long Long Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long Description 1',
        dapp_uuid: '4c4c510c-f12c-4c62-b824-c511490f3a80'
      },
      {
        uuid: '00000002-2c32-4564-8d54-e00d4001b744',
        created_at: new Date(),
        updated_at: new Date(),
        name: 'Name 2',
        short_desc: 'Short Description 2',
        long_desc: 'Long Long Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long Description 2',
        dapp_uuid: '4c4c510c-f12c-4c62-b824-c511490f3a80'
      },
      {
        uuid: '00000003-2c32-4564-8d54-e00d4001b744',
        created_at: new Date(),
        updated_at: new Date(),
        name: 'Name 3',
        short_desc: 'Short Description 3',
        long_desc: 'Long Long Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long Description 3',
        dapp_uuid: '0d4d4c2c-f403-4046-b07e-606a60af9f7f'
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('dapps', null, {});
  }
};