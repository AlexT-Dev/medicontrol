const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController.js');
//Se definen las rutas 

//Para pantallas
router.get('/users/users', userController.list)           //Pantalla principal de usuarios
router.get('/users/new', userController.new)        //Pantalla para agregar usuarios
router.get('/users/modify', userController.modify)        //Pantalla para agregar usuarios
// router.get('/users/erase', userController.delete)        //Pantalla para agregar usuarios


//Para API
router.post('/users/add', userController.save)      //Ruta para guardar nuevos registros 
router.put('/users/edit', userController.edit)      //Ruta para guardar nuevos registros 
router.get('/users/delete/:cuenta', userController.delete)      //Ruta para guardar nuevos registros 

module.exports = router;
