const fechaAtual = require('moment');
const { format } = require('date-fns');
const session = require('express-session');
const messageAlert = require('../validators/messages')

//Para la funcionalidad del servicio

/*
 userAccess = req.session.user        Nombre del usuario
userAccount = req.session.cuenta      Cuenta del Usuario
 userStatus = req.session.status      "ACTIVO, "INACTIVO"
   userType = req.session.userType    "AUXILIAR", "DOCTOR", "ADMINISTRADOR" 
*/

/***** API ******/


//obtiene la fecha del día actual 
const hoy = fechaAtual().format('YYYY-MM-DD')



const assistantControl = {};
//Desplegar la lista de citas en el día actual (hoy) Caso de Uso:Desplegar citas de hoy
assistantControl.list = (req, res) =>{
   //Para datos de la sesión
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;
   
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, padecimiento.idpaciente, usuarios.nombreusuario from pacientes inner join padecimiento ' +
                'on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta where padecimiento.fechacita = ? '+
                'order by padecimiento.horacita', [hoy], (err, citas) =>{
        if (err) { res.json(err) }
             //Toma la vista de views
           res.render('../views/assistant/assistant', {   //usa ../views/asssistant/asssistant porque es primera vez que entra a vistas
            userAccess,
            userType,
            data: citas
           }) 
        
     })   
   })
}

//Para guardar los datos capturados en createDate de Views  (Nuevas citas)

assistantControl.saveDate = async (req, res) => {
   const data = req.body;
   data.status = 'SUBSECUENTE';
   
   req.getConnection((err, conn) => {
     conn.query('insert into padecimiento set ?', [data], (err, pacientes) => {
        res.redirect('../assistant');    //redirecciona a la página principal de citas 
      })
   })
   
};

//Para cancelar la cita
assistantControl.deleteDate = async (req, res) => {
   const idPadActual = req.params.idpadactual;
   await req.getConnection((err, conn) => {
      conn.query('update padecimiento set status = ? where  idpadactual = ?', ["CANCELADA", idPadActual], (err, dates) => {
         res.redirect('../assistant');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
    })
};

//Para restaurar la cita
assistantControl.restoreDate = async (req, res) => {
   const idPadActual = req.params.idpadactual;
   const idPaciente = req.params.idpaciente;

   //Buscar si es paciente de PRIMERA VEZ o SUBSECUENTE

   var restoreDate;
   await req.getConnection((err, restore) => {
      restore.query('select idpadactual from padecimiento where  idpaciente = ?', [idPaciente], (err, datesFound) => {
         restoreDate = datesFound.length === 1  ? "PRIMERA VEZ" : "SUBSECUENTE"
         req.getConnection((err, conn) => {
            conn.query('update padecimiento set status = ? where  idpadactual = ?', [restoreDate, idPadActual], (err, dates) => {
               res.redirect('../assistant');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
             })
          })
      })
   });   
   
    
};

//Para guardar los datos capturados de la cita  (Modificaciones)

assistantControl.updateDate = async (req, res) => { 
   const { idpadactual } = req.params;
   const dateModify = req.body;
   // Control de Sesión
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;
   req.session.message = ""
   //Busca la cita en la fecha de trabajo
   await req.getConnection((err, findDate) => {
      findDate.query('select fechacita, horacita from padecimiento where fechacita = ? and horacita = ?', [dateModify.fechacita, dateModify.horacita], (err, datefound) => {
         if (datefound.length === 0) {
            req.getConnection((err, conn) => {
               conn.query('update padecimiento set ? where idpadactual = ?', [dateModify, idpadactual], (err, dateEdit) => {
                res.redirect('../assistant');
               });
               }); 
         } else {    
         
         req.getConnection((err,conn) =>{
            conn.query(`select pacientes.nombrepaciente, padecimiento.fechacita, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario, usuarios.cuenta from pacientes inner join padecimiento ` +
                       `on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta `+
                       `where padecimiento.idpadactual  = ?`, [idpadactual], (err, dateEdit) =>{
               if (err) { res.json(err) }
                   // Convierte el valor de la fecha en texto
                   dateEdit[0].fechacita = format(dateEdit[0].fechacita,'yyyy-MM-dd');
                   req.session.message = messageAlert("dateFound");
                   res.render('../views/assistant/updateDate', {   //usa ../views/users/users porque es primera vez que entra a vistas
                   userAccess,
                   userAccount,
                   data: dateEdit[0],
                   title: "Modificar Cita",
                   message: req.session.message
                  }) 
               
            })   
          }) 
     };
    });
})

    
   
};


//Para buscar citas en otra fecha

assistantControl.findDates = async (req, res) => {
   const fechacita = req.body.fechacita;
   let query = '';
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;

   if (fechacita) {  
      //Construye el query
      query = "select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario from pacientes inner join padecimiento " +
      "on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta where padecimiento.fechacita = '" + fechacita + 
      "' order by padecimiento.horacita";
   } else {
      //Construye el query
      query = "select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario from pacientes inner join padecimiento " +
      "on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta where padecimiento.fechacita = '" + hoy +
      "' order by padecimiento.horacita";
   }   
   await req.getConnection((err,conn) =>{
      conn.query(query, (err, citas) =>{
         if (err) { res.status(400).json({
              status: 'error',
              message: "No se encontraron registros."
             }) 
          }
         
          //Toma la vista de views
          res.render('../views/assistant/assistant', {   
            userAccess,
            userType,
            data: citas
            
        })  
      })  
    })
};

//Para guardar paciente nuevo
  
assistantControl.savePatient = async (req, res) => {
   const data = req.body;
   const userType = req.session.userType;
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   
   req.getConnection((err, conn) => {
     conn.query('insert into pacientes set ?', [data], (err, pacientes) => {
       res.redirect('../createDate');   //redirecciona a crear la cita
      })
   })
};


// ******* Para páginas ******

//Para nueva cita
assistantControl.newDate = (req, res) =>{
   var doctors = null;
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;

   req.getConnection((err,connu) =>{ //Busca los doctores
      connu.query(`select * from usuarios where tipousuario = "DOCTOR" order by nombreusuario`, (err, users) =>{
        if (err) { res.json(err) }
          //Toma la vista de views
          doctors = users
     })   
   });
   
   req.getConnection((err,conn) =>{ //Busca los pacientes
      conn.query('select * from pacientes order by nombrepaciente', (err, pacientes) =>{
         if (err) { res.json(err) }
            //Toma la vista de views
            res.render('../views/assistant/createDate', {   //usa la vista createDate
               userAccess,
               userAccount,
               title: "Nueva Cita",
               data: pacientes,
               users: doctors,
               message: ""
            }) 
        
      })   
    })

}
 

//Para llamar a la página que modificar resgistros
assistantControl.edit = (req, res) =>{
   const { idpadactual } = req.params;
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;
   req.getConnection((err,conn) =>{
      conn.query(`select pacientes.nombrepaciente, padecimiento.fechacita, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario, usuarios.cuenta from pacientes inner join padecimiento ` +
                 `on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta `+
                 `where padecimiento.idpadactual  = ?`, [idpadactual], (err, dateEdit) =>{
         if (err) { res.json(err) }
             // Convierte el valor de la fecha en texto
             dateEdit[0].fechacita = format(dateEdit[0].fechacita,'yyyy-MM-dd');
             res.render('../views/assistant/updateDate', {   //usa ../views/users/users porque es primera vez que entra a vistas
             userAccess,
             userAccount,
             data: dateEdit[0],
             title: "Modificar Cita",
             message: ""
            }) 
         
      })   
    }) 
}


//Para nuevopaciente
assistantControl.createPatient = (req, res) =>{
   const userAccess = req.session.user; 
   const userAccount = req.session.cuenta;
   const userStatus = req.session.status;
   const userType = req.session.userType;
   
   //Toma la vista de views
   res.render('../views/assistant/createPatient', {   //usa la vista createDate
      userAccess,
      userAccount,
      userType,
      title: "Nuevo Paciente",
      message: ""
   }) 
    
}

module.exports = assistantControl;