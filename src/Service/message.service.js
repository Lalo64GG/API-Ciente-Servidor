const db = require('../Config/db');

class MessageService {
  static async createMessage(senderId, receiverId, sender_name, receiver_name, content) {
    try {
      const connection = await db.createConnection();

      await connection.run(`
        INSERT INTO messages (sender_id, receiver_id, sender_name, receiver_name, content)
        VALUES (?, ?, ?, ?, ?)
      `, [senderId, receiverId, sender_name, receiver_name, content]);

      console.log('Mensaje creado con éxito.');

      await connection.close();
    } catch (error) {
      console.log('Error al crear mensaje:', error);
    }
  }

  static async getMessages( sender_id ) {
    try {
      console.log(sender_id);
      const connection = await db.createConnection();

      const messages = await connection.all(`
        SELECT * FROM messages WHERE sender_id = ${sender_id} 
      `);

      await connection.close();

      return messages;
    } catch (error) {
      console.log('Error al obtener mensajes:', error);
      return [];
    }
  }
}

module.exports = MessageService;
