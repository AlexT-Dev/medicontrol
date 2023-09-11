const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController.js');
//Se definen las rutas 

//Para páginas en el módulo de pacientes
router.get('/ahfapphistory/:idpadactual&:status', doctorController.newHistory)       //Pantalla para agregar datos de ahf y app del paciente de PRIMERA VEZ
router.get('/recordCondition/:idpadactual', doctorController.newCondition)           //Pantalla para agregar datos de del padecimiento PRIMERA VEZ o SUBSECUENTE
router.get('/prescription/:idpadactual', doctorController.newPrescription)           //Pantalla para agregar medicamentos a la receta del paciente
// router.get('/doctor/update/:idpadactual', doctorController.edit)       //Pantalla para modificar usuarios
//router.get('/doctor/erase', doctorController.delete)                   //Pantalla para borrar la cita
// router.get('/doctor/createPatient', doctorController.createPatient)    //Pantalla para crear nuevo paciente


//Para API
router.post('/addAHF/:idpadactual&:status', doctorController.saveAHF)              //Para guardar los AHF del paciente 
router.post('/addAPP/:idpadactual&:status', doctorController.saveAPP)              //Para guardar los APP del paciente 
router.post('/addCondition/:idpadactual', doctorController.saveCondition)          //Para guardar el padecimiento actual 
router.get('/deleteAHF/:idpacienteahf&:idpadactual&:status', doctorController.deleteAHF)    //Para borrar AHF del paciente
router.get('/deleteAPP/:idpacienteapp&:idpadactual&:status', doctorController.deleteAPP)    //Para borrar APP del paciente
router.post('/addMedicine/:idpadactual', doctorController.saveMedicine)                     //Para guardar medicina del paciente
router.get('/eraseMedicine/:iddetallereceta&:idpadactual', doctorController.deleteMedicine)                //Para borrar medicina del paciente


module.exports = router;