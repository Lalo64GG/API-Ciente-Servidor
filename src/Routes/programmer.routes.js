// programmer.route.js
const { Router } = require('express');
const programmerController = require('../Controllers/programmer.controller');
const { authMiddleware } = require('../Middlewares/validarjwt');

const router = Router();

// Rutas
router.post('/', authMiddleware,programmerController.createProgrammer);
router.get('/',programmerController.getAllProgrammers);

module.exports = router;
