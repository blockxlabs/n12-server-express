const config = require("./config")
const server = require("./graphql");
const port = config.api.getPort();

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});