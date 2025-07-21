const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { send, getConversation } = require('../controllers/messageController');
router.post('/', auth, send);
router.get('/:userId', auth, getConversation);
module.exports = router;