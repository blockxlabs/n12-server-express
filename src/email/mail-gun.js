const config = require('./config');
const Mailgun = require('mailgun-js');
const mailgun = new Mailgun({ apiKey: config.apiKey, domain: config.domain });

const sendEmail = (data, userConfig) => {
  
  const mailgunInstance = userConfig ? new Mailgun({ apiKey: userConfig.apiKey, domain: userConfig.domain }) : mailgun;

  return new Promise((resolve, reject) => {
    mailgunInstance.messages().send(data, function (error, body) {
      if (error) {
       reject(error);
      }
      resolve(body);
    });
  });

};

module.exports = {
  mailgun,
  sendEmail
};