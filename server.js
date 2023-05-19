const http = require("http");
const app = require("./app");
require("dotenv").config();
const server = http.createServer(app);

const port = process.env.PORT || 5000;
console.log(port);
server.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});
