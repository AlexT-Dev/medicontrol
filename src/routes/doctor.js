const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController.js');
//Se definen las rutas 

//Para páginas en el módulo de citas
router.get('/doctor/ahfapphistory/:idpadactual&:status', doctorController.newHistory)       //Pantalla para agregar datos de ahf y app del paciente de PRIMERA VEZ
router.get('/doctor/recordCondition/:idpadactual', doctorController.newCondition)           //Pantalla para agregar datos de del padecimiento PRIMERA VEZ o SUBSECUENTE
router.get('/doctor/prescription/:idpadactual', doctorController.newPrescription)           //Pantalla para agregar medicmanetos a la receta del paciente
// router.get('/doctor/update/:idpadactual', doctorController.edit)       //Pantalla para modificar usuarios
//router.get('/doctor/erase', doctorController.delete)                   //Pantalla para borrar la cita
// router.get('/doctor/createPatient', doctorController.createPatient)    //Pantalla para crear nuevo paciente


// //Para API
router.post('/doctor/addAHF/:idpadactual&:status', doctorController.saveAHF)              //Para guardar los AHF del paciente 
router.post('/doctor/addAPP/:idpadactual&:status', doctorController.saveAPP)              //Para guardar los APP del paciente 
router.post('/doctor/addCondition/:idpadactual', doctorController.saveCondition)          //Para guardar el padecimiento actual 
// router.post('/doctor/update/:idpadactual', doctorController.update)   //Ruta actualizar citas 
router.get('/doctor/deleteAHF/:idpacienteahf&:idpadactual&:status', doctorController.deleteAHF)    //Ruta para borrar citas (cambiar el estado)
router.get('/doctor/deleteAPP/:idpacienteapp&:idpadactual&:status', doctorController.deleteAPP)    //Ruta para borrar citas (cambiar el estado)
// router.post('/doctor/findDates', doctorController.findDates)          //Ruta para encontrar citas con fecha diferente (cambiar el estado)
// router.post('/doctor/savePatient', doctorController.savePatient)      //Ruta guardar el registro del nuevo paciente


module.exports = router;