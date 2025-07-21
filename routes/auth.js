const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Get user profile
router.get('/profile', authController.protect, authController.getProfile);

// Update user profile
router.put('/profile', authController.protect, authController.updateProfile);

module.exports = router; 