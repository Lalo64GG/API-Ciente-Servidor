const express = require('express');
const cors = require('cors');
const { createConnection } = require('../Config/db');
const messageRouter = require('../Routes/Menssage.route');
const programmerRouter = require('../Routes/programmer.routes');

class ServerAPI {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.port = process.env.PORT || 3000;
    this.conectarDB();
    this.routerMessage = "/API/messages";
  }

  async conectarDB() {
    await createConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    
  this.app.use('/messages', messageRouter);
  this.app.use('/programmer', programmerRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = ServerAPI;