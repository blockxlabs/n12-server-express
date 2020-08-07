
const convict = require("convict");

const dbSchema = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  dbName: {
    doc: "database name",
    format: "String",
    default: "n12dev",
    env: "DB_NAME",
  },
  dbHost: {
    doc: "database host name",
    format: "String",
    default: "localhost",
    env: "DB_HOST",
  },
  dbUser: {
    doc: "database user name",
    format: "String",
    default: "postgres",
    env: "DB_USER",
  },
  dbDialect: {
    doc: "database dialect",
    format: "String",
    default: "postgres",
    env: "DB_DIALECT"
  },
  dbPassword: {
    doc: "database password",
    format: "String",
    default: "",
    env: "DB_PASSWORD"
  },
  dbLogging: {
    doc: "database logging",
    format: "Boolean",
    default: "true",
    env: "DB_LOGGING"
  }
});

const getEnv = () => {
  try {
    const result = dbSchema.get("env");
    return result;
  } catch (error) {
    throw Error("Missing Environment");
  }
};
const getDBName = () => {
  try {
    const result = dbSchema.get("dbName");
    return result;
  } catch (error) {
    throw Error("Missing dbName");
  }
};
const getDBHost = () => {
  try {
    const result = dbSchema.get("dbHost");
    return result;
  } catch (error) {
    throw Error("Missing dbHost");
  }
};

const getDBUser = () => {
  try {
    const result = dbSchema.get("dbUser");
    return result;
  } catch (error) {
    throw Error("Missing dbUser");
  }
};
const getDBDialect = () => {
  try {
    const result = dbSchema.get("dbDialect");
    return result;
  } catch (error) {
    throw Error("Missing dbDialect");
  }
};

const getDBPassword = () => {
  try {
    const result = dbSchema.get("dbPassword");
    return result;
  } catch (error) {
    throw Error("Missing dbPassword");
  }
};

const getDBLogging = () => {
  try {
    const result = dbSchema.get("dbLogging");
    return result;
  } catch (error) {
    throw Error("Missing dbLogging");
  }
}
module.exports = {
  ...dbSchema,
  getEnv,
  getDBName,
  getDBHost,
  getDBUser,
  getDBDialect,
  getDBPassword,
  getDBLogging
};
