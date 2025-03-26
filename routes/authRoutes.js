const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const { userRegisterController, userLoginController } = require('../controller/authController');

const router = express.Router();

//REGISTER ROUTER
router.post('/register',userRegisterController);

//LOGIN ROUTER
router.post('/login', userLoginController);

module.exports = router