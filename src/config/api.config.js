
const convict = require("convict");

const apiSchema = convict({
  N12WebUrl: {
    doc: "url of N12 web",
    format: "String",
    default: "http://localhost:4000",
    env: "N12_WEB_URL",
  },
  servicePort: {
    doc: "service port number",
    format: "port",
    default: 4000,
    env: "PORT",
  },
  cors: {
    doc: "cors urls",
    format: "String",
    default: "http://localhost:3000",
    env: "API_CORS",
  },
});

const getN12WebUrl = () => {
  try {
    const result = apiSchema.get("N12WebUrl");
    return result;
  } catch (error) {
    throw Error("Missing N12WebUrl");
  }
};

const getPort = () => {
  try {
    const result = apiSchema.get("servicePort");
    return result;
  } catch (error) {
    throw Error("Missing port");
  }
};


const getCors = () => {
  try {
    const result = apiSchema.get("cors");
    const splitResult = result.split(','); 
    if(splitResult.length > 1){
      return splitResult;
    }else{
      return result;
    }
  } catch (error) {
    throw Error("Missing cors");
  }
};

module.exports = {
  ...apiSchema,
  getN12WebUrl,
  getPort,
  getCors
};
