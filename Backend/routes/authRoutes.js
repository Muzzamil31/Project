const express = require('express'); // import express and your controller functions
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
//post route for registration
router.post('/register', registerUser);
//post route for user login
router.post('/login', loginUser);

module.exports = router;
