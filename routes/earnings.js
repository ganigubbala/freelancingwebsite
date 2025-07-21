const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, (req, res) => {
    res.json({ earnings: [] });
});

module.exports = router;