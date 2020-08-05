
const convict = require("convict");

const contractSchema = convict({
  N12WebUrl: {
    doc: "url of N12 web",
    format: "String",
    default: null,
    env: "N12_WEB_URL",
  }
});

const getN12WebUrl = () => {
  try {
    const result = contractSchema.get('N12WebUrl');
    return result;
  } catch (error) {
    throw Error("Missing N12WebUrl");
  }
};

module.exports = {
  ...contractSchema,
  getN12WebUrl
};
