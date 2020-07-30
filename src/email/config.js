const config = {
  development: {
    apiKey: 'apiKey',
    domain: 'domain'
  },
  test: {
    apiKey: 'apiKey',
    domain: 'domain'
  },
  production: {
    apiKey: 'apiKey',
    domain: 'domain'
  }
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];