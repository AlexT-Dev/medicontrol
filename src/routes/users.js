const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator'); // Para validar las capturas de los input
const { validateLogin } = require ('../validators/user')

const userController = require('../controllers/usersController.js');
//Se definen las rutas 

//Para páginas en el módulo de usuarios
router.get('/users', userController.list)               //Pantalla principal de usuarios
router.get('/new', userController.new)                  //Pantalla para agregar usuarios
router.get('/update/:cuenta', userController.edit)      //Pantalla para modificar usuarios
// router.get('/users/erase', userController.delete)          //Pantalla para borrar usuarios


//Para API
router.post('/add', userController.save)                //Ruta para guardar nuevos registros 
router.post('/update/:cuenta', userController.update)   //Ruta para guardar registros actualizados 
router.get('/delete/:cuenta', userController.delete)    //Ruta para borrar registros 
router.post('/find', userController.find)      //Ruta para buscar registros 
router.post('/acceso', userController.getById) //Primer parametro validateLogin
 //userController.getById)      //Ruta para buscar registros 


module.exports = router;
