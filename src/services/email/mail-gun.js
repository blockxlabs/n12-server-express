const Mailgun = require('mailgun-js');
const config = require('../../config');
const models = require('../../db/models');
const { email, api } = require('../../config');
const apiKey = config.email.getMailGunAPIKey();
const domain = config.email.getMailGunDomain();
const emailFrom = config.email.getEmailFrom();
const mailgun = new Mailgun({ apiKey, domain });

const createConfirmEmailData = async (dAppUuid, notificationUuids, user) => {
  const dApp = await models.DApps.findByPk(dAppUuid);
  const notifications = await models.Notifications.findAll({
    where : {
      uuid: notificationUuids
    }
  });

  let emailText = `Your Subscription With ${dApp.name}:`;
  let emailContent = {
    dAppLogo: dApp.logoUrl,
    dAppName: dApp.name,
    notifications: [],
    unsubLink: `${api.getN12WebUrl()}/manage-subscription/${user.uuid}/${dApp.uuid}`
  };

  notifications.forEach(notif => {
    emailContent.notifications.push(
      {
        name: notif.name,
        shortDesc: notif.shortDescription
      }
    );
    emailText += ` ${notif.name}`;
  });

  const emailData = {
    to: user.email,
    subject: 'Subscription Confirmation',
    text: emailText,
    // replace test template with actual template here
    template: "test",
    'h:X-Mailgun-Variables': JSON.stringify(emailContent)
  };
  return emailData;
};

const sendEmail = (data, userConfig) => {

  const mailgunInstance = userConfig ? new Mailgun({ apiKey: userConfig.apiKey, domain: userConfig.domain }) : mailgun;

  return new Promise((resolve, reject) => {
    mailgunInstance.messages().send({ ...data, from: emailFrom }, function (error, body) {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });

};

module.exports = {
  sendEmail,
  createConfirmEmailData
};