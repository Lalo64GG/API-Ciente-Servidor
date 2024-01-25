const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { createConnection } = require("../Config/db");
const messageRouter = require("../Routes/Menssage.route");
const programmerRouter = require("../Routes/programmer.routes");
const socketServer = require("../LongPolling/socket");
const { format } = require("path");

class ServerAPI {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.port = process.env.PORT || 3000;
    this.conectarDB();
    this.routerMessage = "/API/messages";
    this.initializeSocketIO();
  }

  initializeSocketIO() {
    const server = http.createServer(this.app);
    const io = socketIo(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    // Lista de clientes en línea
    let clientes = [];

    io.on("connection", (socket) => {
      console.log(`Nuevo cliente de Socket.IO conectado: ${socket.id}`);
      clientes.push(socket.id)
        console.log("Clientes conectados:", clientes.length );

      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Cliente ${socket.id} se unió a la sala ${room}`);
      });

      socket.on('messageToRoom', (body) => {
        console.log(body);
          socket.to(body.room).emit('message', {
          body: body.text,
          from: socket.id.slice(6),
        });
      });
      
      
      socket.on("message", (body) => {
        
        socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(6),
        });
      });

      socket.on("disconnect", () => {
        console.log(`Cliente ${socket.id} desconectado`);
        clientes.splice(clientes.indexOf(socket.id), 1);
      });
    });

    this.app.get("/clientes", (req, res) => {
      res.json({ clientesEnLinea: clientes.length });
    });

    server.listen(this.port +1, () => {
      console.log(`Server is running on port ${this.port +1}`);
    });
  }
  async conectarDB() {
    try {
      await createConnection();
      console.log("Connected to the database");
    } catch (error) {
      console.error("Error connecting to the database:", error.message);
      process.exit(1);
    }
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/messages", messageRouter);
    this.app.use("/programmer", programmerRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = ServerAPI;
