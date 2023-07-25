const express = require('express');
const routerLogin = express.Router();

const loginController = require('../controllers/loginController.js');
//Se definen las rutas 

//Para login
routerLogin.get('/login', loginController.login)               //Pantalla principal de login



module.exports = routerLogin;