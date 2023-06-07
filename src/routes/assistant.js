const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistantController.js');
//Se definen las rutas 

//Para páginas en el módulo de usuarios
router.get('/assistant/assistant', assistantController.list)               //Pantalla principal de citas
router.get('/assistant/createDate', assistantController.newDate)                  //Pantalla para agregar usuarios
router.get('/assistant/update/:idpadactual', assistantController.edit)      //Pantalla para modificar usuarios
router.get('/assistant/erase', assistantController.delete)          //Pantalla para borrar la cita


//Para API
router.post('/assistant/addDate', assistantController.saveDate)                //Ruta para guardar nuevos registros 
router.post('/assistant/update/:idpadactual', assistantController.update)   //Ruta para guardar registros actualizados 
router.get('/assistant/delete/:idpadactual', assistantController.delete)    //Ruta para borrar registros (cambiar el estado)
// router.post('/users/acceso', userController.getById)      //Ruta para buscar registros 


module.exports = router;