const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.controller');

router.get('/:senderId', messageController.getMessages);
router.get('/message/nuevo', messageController.getNuevoMessage);
router.post('/new', messageController.createMessage);

module.exports = router;