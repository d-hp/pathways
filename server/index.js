const app = require('./app');
const http = require('http');
const config = require('./util/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  `Server is running on port ${config.PORT}`;
});
