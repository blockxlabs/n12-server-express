const email = require("./email.config");
const api = require('./api.config');
// Perform validation
email.validate({ allowed: "strict" });
api.validate({ allowed: "strict" });

module.exports = { email, api };
