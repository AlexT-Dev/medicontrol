const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistantController.js');
//Se definen las rutas 

//Para páginas en el módulo de usuarios
router.get('/assistant/assistant', assistantController.list)               //Pantalla principal de usuarios
router.get('/assistant/createDate', assistantController.newDate)                  //Pantalla para agregar usuarios
// router.get('/users/update/:cuenta', userController.edit)      //Pantalla para modificar usuarios
// router.get('/users/erase', userController.delete)          //Pantalla para borrar usuarios


//Para API
// router.post('/users/add', userController.save)                //Ruta para guardar nuevos registros 
// router.post('/users/update/:cuenta', userController.update)   //Ruta para guardar registros actualizados 
// router.get('/users/delete/:cuenta', userController.delete)    //Ruta para borrar registros 
// router.post('/users/find', userController.find)      //Ruta para buscar registros 
// router.post('/users/acceso', userController.getById)      //Ruta para buscar registros 


module.exports = router;