const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistantController.js');
//Se definen las rutas 

//Para páginas en el módulo de citas
router.get('/assistant', assistantController.list)                 //Pantalla principal de citas
router.get('/createDate', assistantController.newDate)             //Pantalla para agregar cita
router.get('/updateDate/:idpadactual', assistantController.edit)       //Pantalla para modificar cita
router.get('/erase', assistantController.delete)                   //Pantalla para borrar la cita
router.get('/createPatient', assistantController.createPatient)    //Pantalla para crear nuevo paciente


//Para API
router.post('/addDate', assistantController.saveDate)             //Para guardar nuevas citas 
router.post('/updateDate/:idpadactual', assistantController.updateDate)   //Actualizar citas 
router.get('/delete/:idpadactual', assistantController.delete)    //Para borrar citas (cambiar el estado)
router.post('/findDates', assistantController.findDates)          //Para encontrar citas con fecha diferente (cambiar el estado)
router.post('/savePatient', assistantController.savePatient)      //Guardar el registro del nuevo paciente


module.exports = router;