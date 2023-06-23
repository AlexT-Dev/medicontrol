const fechaAtual = require('moment');
const { format } = require('date-fns');
const session = require('express-session');

//Para la funcionalidad del servicio

/*
 userAccess = req.session.user        Nombre del usuario
userAccount = req.session.cuenta      Cuenta del Usuario
 userStatus = req.session.status      "ACTIVO, "INACTIVO"
   userType = req.session.userType    "AUXILIAR", "DOACTOR", "ADMINISTRADOR" 
*/

//obtiene la fecha del día actual 
const hoy = fechaAtual().format('YYYY-MM-DD') 

const doctorControl = {};

//Desplegar los datos del paciente
doctorControl.newHistory = (req, res) =>{

    const { idpadactual } = req.params
    //Para datos de la sesión
    const userAccess = req.session.user; 
    const userAccount = req.session.cuenta;
    const userStatus = req.session.status;
    const userType = req.session.userType;
    
    //Se crea la conexión a la base de datos
    req.getConnection((err,conn) =>{
      conn.query('select padecimiento.idpadactual, pacientes.nombrepaciente, pacientes.edad,pacientes.estadocivil, pacientes.escolaridad, pacientes.empleo, '
               + 'pacientes.lugarnacimiento, pacientes.lugarvive, pacientes.alergias from pacientes inner join padecimiento on pacientes.idpaciente = padecimiento.idpaciente '
               + 'where padecimiento.idpadactual = ?', [idpadactual], (err, patientData) =>{
         if (err) { res.json(err) }
              //Toma la vista de views
            res.render('../views/doctors/ahfappHistory', {   //usa ../views/asssistant/asssistant porque es primera vez que entra a vistas
             userAccess,
             userType,
             patient: patientData,
             title : "Paciente de Primera Vez"
            }) 
         
      })   
    })
 }

 module.exports = doctorControl;