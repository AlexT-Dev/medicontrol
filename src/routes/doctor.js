const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController.js');
//Se definen las rutas 

//Para páginas en el módulo de citas
router.get('/doctor/ahfapphistory/:idpadactual', doctorController.newHistory)       //Pantalla para agregar daos de ahf y app del paciente de PRIMERA VEZ
// router.get('/doctor/update/:idpadactual', doctorController.edit)       //Pantalla para modificar usuarios
// router.get('/doctor/erase', doctorController.delete)                   //Pantalla para borrar la cita
// router.get('/doctor/createPatient', doctorController.createPatient)    //Pantalla para crear nuevo paciente


// //Para API
// router.post('/doctor/addDate', doctorController.saveDate)             //Ruta para guardar nuevas citas 
// router.post('/doctor/update/:idpadactual', doctorController.update)   //Ruta actualizar citas 
// router.get('/doctor/delete/:idpadactual', doctorController.delete)    //Ruta para borrar citas (cambiar el estado)
// router.post('/doctor/findDates', doctorController.findDates)          //Ruta para encontrar citas con fecha diferente (cambiar el estado)
// router.post('/doctor/savePatient', doctorController.savePatient)      //Ruta guardar el registro del nuevo paciente


module.exports = router;