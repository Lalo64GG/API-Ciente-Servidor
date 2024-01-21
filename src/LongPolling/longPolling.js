// longPolling.js
const messageService = require("../Service/Menssage.service");

let clients = [];

const addClient = (res, req) => {
  clients.push(res);

  req.on("close", () => {
    const index = clients.length - 1;
    clients = clients.slice(index, 1);
  });
};

const notifyClients = () => {
  clients.forEach(async (res) => {
    const messages = await messageService.getAllMessages();
    res.json({ messages });
  });
  clients.length = 0; // Limpiar la lista después de notificar
};

const waitForNewMessages = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const newMessages = await messageService.waitForNewMessages();
        resolve({ messages: newMessages });
      } catch (error) {
        reject(error);
      }
    }, 2000); // Puedes ajustar el tiempo de espera según tus necesidades
  });
};

module.exports = {
  addClient,
  notifyClients,
  waitForNewMessages,
};
