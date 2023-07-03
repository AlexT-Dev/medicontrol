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
/*
   Para los servicios en las páginas
*/

//Desplegar los datos del paciente
doctorControl.newHistory = (req, res) =>{

    const  idpadactual  = req.params.idpadactual;
    const  status = req.params.status;
    
    var ahf = null;
    var app = null;
    var parentesco = null;
   
   
    //Para datos de la sesión
    const userAccess = req.session.user; 
    const userAccount = req.session.cuenta;
    const userStatus = req.session.status;
    const userType = req.session.userType;
    
    req.getConnection((err,connu) =>{ //Busca los AHF del Catálogo
      connu.query(`select * from ahf order by nombreahf`, (err, ahfs) =>{
        if (err) { res.json(err) }
          //Toma la vista de views
          ahf = ahfs;
         
     })   
   });

   req.getConnection((err,connu) =>{ //Busca los Parentescos del Catálogo
    connu.query('select * from parentesco order by nombreparentesco', (err, parentescos) =>{
      if (err) { res.json(err) }
        //Toma la vista de views
        parentesco = parentescos;
        
    })   
   });


    
   req.getConnection((err,connu) =>{ //Busca los Tipos de APP del Catálogo
    connu.query("select tipoapp.idtipoapp, concat(nombretipoapp, ' - ',app.nombreapp) as nombretipo "
              + "from app, tipoapp where app.idapp = tipoapp.idapp order by tipoapp.nombretipoapp", (err, apps) =>{
      if (err) { res.json(err) }
        app = apps;
       
   })   
 });

    req.getConnection((err,conn) =>{
      //Obtiene los datos del paciente que será atendido
      conn.query('select padecimiento.idpadactual, padecimiento.status, pacientes.idpaciente, pacientes.nombrepaciente, pacientes.edad,pacientes.estadocivil, pacientes.escolaridad, pacientes.empleo, '
               + 'pacientes.lugarnacimiento, pacientes.lugarvive, pacientes.alergias from pacientes inner join padecimiento on pacientes.idpaciente = padecimiento.idpaciente '
               + 'where padecimiento.idpadactual = ?', [idpadactual], (err, patientData) =>{
               
         if (err) { res.json(err) }
              //Toma la vista de views
            res.render('../views/doctors/ahfappHistory', {   //usa la vista para crear la historia clínica del paciente
             userAccess,
             userType,
             ahfs: ahf,
             parentescos: parentesco,
             apps: app,
             patient: patientData[0],
             title : "Paciente de Primera Vez",
             
            }) 
        
      })   
    })
 }

 

/*
   Para los servicios API
*/
 
doctorControl.saveAHF = async (req, res) => {
  const data = req.body;
  const  idpadactual  = req.params.idpadactual;
  const  status = req.params.status;
  console.log(req.body)
  req.getConnection((err, conn) => {
    conn.query('insert into pacienteahf set ?', [data], (err, pacientesahf) => {
      
      res.redirect('../ahfappHistory/'+idpadactual+"&"+status);    
     })
     console.log(err)
  })
  
};




 module.exports = doctorControl;