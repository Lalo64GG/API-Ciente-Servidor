const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.controller');
const { authMiddleware } = require('../Middlewares/validarjwt');

router.get('/:senderId',messageController.getMessages);
router.get('/message/nuevo' ,messageController.getNuevoMessage);
router.post('/new',messageController.createMessage);

module.exports = router;