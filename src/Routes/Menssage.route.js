const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.controller');
const { authMiddleware } = require('../Middlewares/validarjwt');

router.get('/:senderId', authMiddleware ,messageController.getMessages);
router.get('/message/nuevo', authMiddleware ,messageController.getNuevoMessage);
router.post('/new', authMiddleware ,messageController.createMessage);

module.exports = router;