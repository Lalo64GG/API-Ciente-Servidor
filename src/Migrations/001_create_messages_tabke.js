// 001_create_messages_table.js
const db = require('../Config/db');

(async () => {
  try {
    const connection = await db.createConnection();

    await connection.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id INTEGER NOT NULL,
        receiver_id INTEGER NOT NULL,
        sender_name TEXT NOT NULL,
        receiver_name TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES programmers(id),
        FOREIGN KEY (receiver_id) REFERENCES programmers(id)
      )
    `);

    console.log('Tabla de mensajes creada con éxito.');

    await connection.close();
  } catch (error) {
    console.log('Error al crear tabla de mensajes:', error);
  }
})();
