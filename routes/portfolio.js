const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { create, getByUser } = require('../controllers/portfolioController');
router.post('/', auth, create);
router.get('/', auth, getByUser);
module.exports = router;