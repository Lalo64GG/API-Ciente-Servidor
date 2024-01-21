// programmer.route.js
const { Router } = require('express');
const programmerController = require('../Controllers/programmer.controller');

const router = Router();

// Rutas
router.post('/', programmerController.createProgrammer);
router.get('/', programmerController.getAllProgrammers);

module.exports = router;
