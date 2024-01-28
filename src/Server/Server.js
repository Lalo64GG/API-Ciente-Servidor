const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { createConnection } = require("../Config/db");
const messageRouter = require("../Routes/Menssage.route");
const programmerRouter = require("../Routes/programmer.routes");
const routerLogin = require("../Routes/login.Routes")
const { format } = require("path");
const jwt = require('jsonwebtoken');

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
    const clientes = []
    const io = socketIo(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", async (socket) => {
      if (socket.handshake.headers.authorization) {
        const token = socket.handshake.headers.authorization.split(' ')[1];
 
        // Verifica y decodifica el token
        jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA2MjQxNDk2LCJleHAiOjE3MDYyNDUwOTZ9.OmCiiMeQjrVOnWn7K-2qZZ7q4zbKV3kOey_Fz28bV3w", 'tu_secreto_secreto', async (err, decoded) => {
          if (err) {
            // Manejar error de token no válido
            console.error('Error de autenticación:', err);
            socket.disconnect();
            return;
          }

          // El token es válido, puedes acceder a la información del usuario desde 'decoded'
          const userId = decoded.id;
          console.log("User id: ", userId);

          // Ejecuta la conexión a la base de datos solo si userId cumple con las condiciones
          if (userId && userId > 0) {
            try {
              await this.conectarDB();
            } catch (error) {
              console.error("Error connecting to the database:", error.message);
              process.exit(1);
            }
          }

          // Resto del código...
        });
      clientes.push(socket.id)

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
    }});

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
    this.app.use("/login", routerLogin );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = ServerAPI;
