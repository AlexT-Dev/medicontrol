const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistantController.js');
//Se definen las rutas 

//Para páginas en el módulo de citas
router.get('/assistant/assistant', assistantController.list)               //Pantalla principal de citas
router.get('/assistant/createDate', assistantController.newDate)                  //Pantalla para agregar usuarios
router.get('/assistant/update/:idpadactual', assistantController.edit)      //Pantalla para modificar usuarios
router.get('/assistant/erase', assistantController.delete)          //Pantalla para borrar la cita
router.get('/assistant/createPatient', assistantController.createPatient)          //Pantalla para crear nuevo paciente


//Para API
router.post('/assistant/addDate', assistantController.saveDate)                //Ruta para guardar nuevos registros 
router.post('/assistant/update/:idpadactual', assistantController.update)   //Ruta para guardar registros actualizados 
router.get('/assistant/delete/:idpadactual', assistantController.delete)    //Ruta para borrar registros (cambiar el estado)
router.post('/assistant/findDates', assistantController.findDates)    //Ruta para encontrar  registros (cambiar el estado)
router.post('/assistant/savePatient', assistantController.savePatient)    //Ruta guardar el registro del nuevo paciente


module.exports = router;