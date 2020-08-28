const  uuid  = require('uuid');
const { ApolloError } = require('apollo-server');
const { email: emailConfig } = require('../../config');

const resolvers = {
  Query: {
      async user (root, { id }, { models }) {
        return models.User.findByPk(id)
      },
      async allDApps (root, args, { models }) {
        return models.DApp.findAll();
      },
      async searchDApps (root, args, { models, Op }) {
        const options = {
          where : {
            [Op.or]: [
              {name: {[Op.iLike] : `%${args.searchLike}%` }}, 
              {description: {[Op.iLike] : `%${args.searchLike}%` }}
            ]
          }
        }

        const result = await models.DApp.findAll(options);

        return result;
      },
      async dApp (root, { uuid }, { models }) {
        return models.DApp.findByPk(uuid)
      },
      async allNotifications (root, args, { models }) {
        return models.Notification.findAll()
      },
      async notification (root, { uuid }, { models }) {
        return models.Notification.findByPk(uuid)
      },
      async notificationsByDApp(root, { dAppUuid, searchQuery, offset, limit }, { models,Op }) {

        const where = { dAppUuid };
        if (searchQuery) {
          where.name = { [Op.iLike]: `%${searchQuery}%` };
        }

        const { count, rows } = await models.Notification.findAndCountAll({
          where,
          offset: offset || 0,
          limit: limit || 10
        });

        const dApp = await models.DApp.findByPk(dAppUuid);

        return {
          notifications: rows,
          totalCount: count,
          dApp
        };

      },
      async UserSubscriptions(root, { userUuid }, { models }) {
        return models.UserNotification.findAll({
          where: { userUuid }
        });
      }      
    },

  Mutation: {
    async subscribeNotifications(root, { email, dAppUuid, selectedNotifications }, { models, emailUtil }) {
      try {
        const [user, created] = await models.User.findOrCreate({
          raw: true,
          where: { email },
          defaults: {
            uuid: uuid.v4()
          }
        });
        const records = selectedNotifications.map(notification => {
          return {
            uuid: uuid.v4(),
            userUuid: user.uuid,
            dAppUuid: dAppUuid,
            notificationsUuid: notification
          }
        });

        const options = { returning: true, updateOnDuplicate: ['user_uuid', 'd_app_uuid','notifications_uuid', 'deleted_at'] };
        const userNotifications = await models.UserNotification.bulkCreate(records, options);
        if (emailConfig.getEmailEnabled()) {
          const confirmEmailData = await emailUtil.createConfirmEmailData(dAppUuid, selectedNotifications, user);
          await emailUtil.sendEmail(confirmEmailData);
        }
        return userNotifications;
      } catch (error) {
        throw new ApolloError(
          "Create User Notification Error",
          "CREATE_USER_NOTIFICATION_ERROR",
        );
      }

    }, 
    async unsubscribeNotifications(root, { userNotifications }, { models }) {
      await models.UserNotification.destroy({ where: { uuid: userNotifications } });
      return true;
    },
    async testEmail(root, { to, apiKey, domain }, { emailUtil }) {
      const testData = {
        to,
        subject: 'TEST',
        text: 'Testing some Mailgun emails!',
        template: "test",
        'h:X-Mailgun-Variables': JSON.stringify({
          "dAppLogo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1518.png",
          "dAppName": "MakerDAO",
          "notifications": [
            {
              "name": "Name 3",
              "shortDesc": "description for Name 3"
            },
            {
              "name": "Name 4",
              "shortDesc": "description for Name 4"
            },
            {
              "name": "Name 5",
              "shortDesc": "description for Name 5"
            }
          ],
          "unsubLink": "#"
        })
      };
      await emailUtil.sendEmail(testData, { apiKey, domain });
      return true;
    }
  },

  DApp: {
    Notifications : async (dapp, args, {dataloader} ) =>  {    
      // console.log(`fetching dapp ${dapp.uuid}`)
      const result = dataloader.notificationsLoader.load(dapp.uuid);
      return result;
    }
  },
  Notification: {
    DApp : async (notification, args, {models, dataloader}) => {
      // console.log(`fetching notification ${notification.dAppUuid}`);
      const result = dataloader.dappsLoader.load(notification.dAppUuid);
      return result;
    }
  },
  UserNotification: {
    DApp: async (userNotification, args, { models }) => {
      return models.DApp.findByPk(userNotification.dAppUuid);
    },
    Notification: async (userNotification, args, { models }) => {
      return models.Notification.findByPk(userNotification.notificationsUuid);
    },
    User: (userNotification, args, { models }) => {
      return models.User.findByPk(userNotification.userUuid);
    },
  }
}

module.exports = resolvers