// services/programmerService.js
const db = require('../Config/db');

async function createProgrammer(name, email, password, gitLink, instagramLink, linkedinLink, phoneNumber, skills) {
  try {
    const connection = await db.createConnection();

    await connection.run(`
      INSERT INTO programmers (name, email, password, git_link, instagram_link, linkedin_link, phone_number, skills)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, email, password, gitLink, instagramLink, linkedinLink, phoneNumber, skills]);

    console.log('Programador creado con éxito.');

    await connection.close();
  } catch (error) {
    console.log('Error al crear programador:', error);
  }
}

async function getAllProgrammers() {
  try {
    const connection = await db.createConnection();

    const programmers = await connection.all(`
      SELECT * FROM programmers
    `);

    await connection.close();

    return programmers;
  } catch (error) {
    console.log('Error al obtener programadores:', error);
    return [];
  }
}

module.exports = {
  createProgrammer,
  getAllProgrammers,
};
