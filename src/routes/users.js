const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController.js');
//Se definen las rutas 

router.get('/users', userController.list)           //Pantalla principal de usuarios
router.get('/users/new', userController.new)        //Pantalla para agregar usuarios
router.post('/users/add', userController.save)      //Ruta para guardar nuevos registros 

module.exports = router;
