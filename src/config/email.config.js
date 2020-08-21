
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
    default: "info@blockxlabs.com",
    env: "MAIL_GUN_EMAIL_FROM",
  },
  ConfirmationEmailTemplate: {
    doc: "template id of confirmation email in mailgun",
    format: "String",
    default: "n12-notification-subscribed",
    env: "MAIL_GUN_CONFIRMATION_EMAIL_TEMPLATE"
  },
  EmailEnabled: {
    doc: "if enable email sending",
    format: "Boolean",
    default: "false",
    env: "MAIL_GUN_EMAIL_ENABLED"
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

const getEmailEnabled = () => {
  try {
    const result = emailSchema.get("EmailEnabled");
    return result;
  } catch (error) {
    throw Error("Missing EmailEnabled");
  }
};

module.exports = {
  ...emailSchema,
  getMailGunAPIKey,
  getMailGunDomain,
  getEmailFrom,
  getConfirmationEmailTemplate,
  getEmailEnabled
};
