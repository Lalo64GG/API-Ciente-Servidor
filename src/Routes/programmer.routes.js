// programmer.route.js
const { Router } = require('express');
const programmerController = require('../Controllers/programmer.controller');
const { authMiddleware } = require('../Middlewares/validarjwt');

const router = Router();

// Rutas
router.post('/', programmerController.createProgrammer);
router.get('/',authMiddleware, programmerController.getAllProgrammers);

module.exports = router;
