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
doctorControl.newHistory = async (req, res) =>{

    const  idpadactual  = req.params.idpadactual;
    const  status = req.params.status;
    
    var idpaciente = 0;                       // Obtiene el id del paciente
    var ahf = null;                              // Obtiene los ahf del catálogo
    var ahfPatient = null;                       // Obtiene los ahf del paciente 
    var app = null;                              // Obtiene los app del catálogo
    var parentesco = null;                       // Obtiene los parentescos del catálogo
    var dataPatient = null;                      // Obtiene los datos del paciente
   
    //Para datos de la sesión
    const userAccess = req.session.user; 
    const userAccount = req.session.cuenta;
    const userStatus = req.session.status;
    const userType = req.session.userType;
    
    await req.getConnection((err,connahf) =>{ //Busca los AHF del Catálogo
      connahf.query("select * from ahf order by nombreahf", (err, ahfs) =>{
        if (err) { res.json(err) }
          //Toma la vista de views
          ahf = ahfs;
         
      })   
    });

    

    await req.getConnection((err,connpa) =>{ //Busca los Parentescos del Catálogo
    connpa.query("select * from parentesco order by nombreparentesco", (err, parentescos) =>{
      if (err) { res.json(err) }
        //Toma la vista de views
        parentesco = parentescos;
        
    })   
   });


   await req.getConnection((err,connapp) =>{ //Busca los Tipos de APP del Catálogo
    connapp.query("select tipoapp.idtipoapp, concat(nombretipoapp, ' - ',app.nombreapp) as nombretipo "
              + "from app, tipoapp where app.idapp = tipoapp.idapp order by tipoapp.nombretipoapp", (err, apps) =>{
      if (err) { res.json(err) }
        app = apps;
  
      })   
    }); 
       

     
      await  req.getConnection((err,conn) =>{  //Obtiene los datos del paciente que será atendido
      conn.query('select padecimiento.idpadactual, padecimiento.status, pacientes.idpaciente, pacientes.nombrepaciente, pacientes.edad,pacientes.estadocivil, pacientes.escolaridad, pacientes.empleo, '
               + 'pacientes.lugarnacimiento, pacientes.lugarvive, pacientes.alergias from pacientes inner join padecimiento on pacientes.idpaciente = padecimiento.idpaciente '
               + 'where padecimiento.idpadactual = ?', [idpadactual], (err, patientData) =>{
            if (err) { res.json(err) }
            idpaciente = patientData[0].idpaciente;
            dataPatient = patientData
            
        
      
         req.getConnection((err,connAHFP) =>{ //Busca los AHF del Paciente
          connAHFP.query("select pacienteahf.idpacienteahf, pacienteahf.idpaciente, ahf.nombreahf, parentesco.nombreparentesco from pacienteahf inner join ahf " + 
          "on pacienteahf.idahf = ahf.idahf inner join parentesco on pacienteahf.idparentesco = parentesco.idparentesco " +
          "where pacienteahf.idpaciente = ?", [idpaciente], (err,ahfsPatient) =>{
              if (err) { res.json(err) }
              ahfPatient = ahfsPatient;
         
          
        
            //Toma la vista de views
             console.log(ahfPatient)
             res.render('../views/doctors/ahfappHistory', {   //usa la vista para crear la historia clínica del paciente
             userAccess,
             userType,
             ahfs: ahf,
             ahfpatients: ahfPatient,
             parentescos: parentesco,
             apps: app,
             patient: dataPatient[0],
             title : "Paciente de Primera Vez"
             
            }) 
        
          })   
        });  
      })   
    }); 
 }

 

/*
   Para los servicios API
*/
 
doctorControl.saveAHF = async (req, res) => {
  const data = req.body;
  const  idpadactual  = req.params.idpadactual;
  const  status = req.params.status;
  console.log(req.body)
  await req.getConnection((err, conn) => {
    conn.query('insert into pacienteahf set ?', [data], (err, pacientesahf) => {
      
      res.redirect('../ahfappHistory/'+idpadactual+"&"+status);    
     })
     console.log(err)
  })
  
};




 module.exports = doctorControl