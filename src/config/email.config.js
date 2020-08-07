
const convict = require("convict");

const emailSchema = convict({
  MailGunAPIKey: {
    doc: "mailgun api key",
    format: "String",
    default: null,
    env: "MAIL_GUN_API_KEY",
  },
  MailGunDomain: {
    doc: "mailgun domain",
    format: "String",
    default: null,
    env: "MAIL_GUN_DOMAIN",
  },
  EmailFrom: {
    doc: "Email sender name and address",
    format: "String",
    default: null,
    env: "EMAIL_FROM",
  },
  ConfirmationEmailTemplate: {
    doc: "template id of confirmation email in mailgun",
    format: "String",
    default: "n12-notification-subscribed",
    env: "CONFIRMATION_EMAIL_TEMPLATE"
  }
});

const getMailGunAPIKey = () => {
  try {
    const result = emailSchema.get("MailGunAPIKey");
    return result;
  } catch (error) {
    throw Error("Missing APIKey");
  }
};

const getMailGunDomain = () => {
  try {
    const result = emailSchema.get("MailGunDomain");
    return result;
  } catch (error) {
    throw Error("Missing domain");
  }
};

const getConfirmationEmailTemplate = () => {
  try {
    const result = emailSchema.get("ConfirmationEmailTemplate");
    return result;
  } catch (error) {
    throw Error("Missing ConfirmationEmailTemplate");
  }
};


const getEmailFrom = () => {
  try {
    const result = emailSchema.get("EmailFrom");
    return result;
  } catch (error) {
    throw Error("Missing EmailFrom");
  }
};

module.exports = {
  ...emailSchema,
  getMailGunAPIKey,
  getMailGunDomain,
  getEmailFrom,
  getConfirmationEmailTemplate
};
