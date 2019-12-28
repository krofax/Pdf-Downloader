const express = require('express');

const RegisterController = require('../controller/register') 
const LoginController = require('../controller/login') 

const router = express.Router();

router.post('/login', LoginController.userLogin);

router.post('/register', RegisterController.register);

module.exports = router;