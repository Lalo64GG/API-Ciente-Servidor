// 002_create_programmers_table.js
const db = require('../Config/db');

(async () => {
  try {
    const connection = await db.createConnection();

    await connection.run(`
      CREATE TABLE IF NOT EXISTS programmers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        skills TEXT,
      )
    `);

    console.log('Tabla de programadores creada con éxito.');

    await connection.close();
  } catch (error) {
    console.log('Error al crear tabla de programadores:', error);
  }
})();
