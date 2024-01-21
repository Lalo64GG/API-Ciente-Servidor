const MessageService = require("../Service/message.service");

//log polling

let resMessage = [];

const getMessages = async (req, res) => {
  try {
    const sender_id = req.params.senderId;
    console.log(sender_id);
    const message = await MessageService.getMessages(sender_id);

    return res.status(200).json({
      message: "Se obtubieron los mensajes correctamente",
      message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los mensajes",
      error: error.message,
    });
  }
};

const getNuevoMessage = (req, res) => {
  resMessage.push(res);
  
  req.on('close', () => {
    const index = resMessage.length - 1;
    console.log(index);
    resMessage = resMessage.splice(index, 1);
  });
};

const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, sender_name, content } = req.body;

    await MessageService.createMessage(senderId, receiverId, sender_name, content);

    const newMessage = { senderId, receiverId, sender_name, content };


    responderMenssage(newMessage);

    return res.status(201).json({
      success: true,
      message: "Message created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el mensaje",
      error: error.message,
    });
  }
};

function responderMenssage(message){
    console.log(message);
    for (res of resMessage) {
        res.status(200).json({
            success: true,
            message
        });
    }
    resMessage = [];
}

module.exports = {
  getMessages,
  getNuevoMessage,
  createMessage,
};
