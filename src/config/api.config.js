
const convict = require("convict");

const apiSchema = convict({
  N12WebUrl: {
    doc: "url of N12 web",
    format: "String",
    default: "http://localhost:4000",
    env: "N12_WEB_URL",
  }
});

const getN12WebUrl = () => {
  try {
    const result = apiSchema.get("N12WebUrl");
    return result;
  } catch (error) {
    throw Error("Missing N12WebUrl");
  }
};

module.exports = {
  ...apiSchema,
  getN12WebUrl
};
