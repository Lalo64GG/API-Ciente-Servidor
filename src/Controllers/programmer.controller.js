// programmer.controller.js
const programmerService = require('../Service/programmer.service');

const createProgrammer = async (req, res) => {
  try {
    const { name, email, password, gitLink, instagramLink, linkedinLink, phoneNumber, skills } = req.body;
    const result = await programmerService.createProgrammer(name, email, password, gitLink, instagramLink, linkedinLink, phoneNumber, skills);
    res.json(result);
  } catch (error) {
    console.error('Error al crear el programador:', error);
    res.status(500).json({ error: 'Error al crear el programador' });
  }
};
const getAllProgrammers = async (req, res) => {
  try {
    const programmers = await programmerService.getAllProgrammers();
    res.json(programmers);
  } catch (error) {
    console.error('Error al obtener todos los programadores:', error);
    res.status(500).json({ error: 'Error al obtener todos los programadores' });
  }
};

module.exports = {
  createProgrammer,
  getAllProgrammers,
};
