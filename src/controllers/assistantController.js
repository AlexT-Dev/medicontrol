const fechaAtual = require('moment');
const { format } = require('date-fns');
//Para la funcionalidad del servicio

//obtiene la fecha del día actual 
const hoy = fechaAtual().format('YYYY-MM-DD')

const assistantControl = {};
//Desplegar la lista de citas en el día actual (hoy) Caso de Uso:Desplegar citas de hoy
assistantControl.list = (req, res) =>{
   
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario from pacientes inner join padecimiento ' +
                'on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta where padecimiento.fechacita = ? '+
                'order by padecimiento.horacita', [hoy], (err, citas) =>{
        if (err) { res.json(err) }
        
           //Asigna valores de la session
           const userAccess = req.session.user; 
           //Toma la vista de views
           res.render('../views/assistant/assistant', {   //usa ../views/asssistant/asssistant porque es primera vez que entra a vistas
            userAccess,
            data: citas
           }) 
        
     })   
   })
}

//Para guardar los datos capturados en createDate de Views  (Nuevas citas)

assistantControl.saveDate = async (req, res) => {
   const data = req.body;
   console.log(data) 
   req.getConnection((err, conn) => {
     conn.query('insert into padecimiento set ?', [data], (err, pacientes) => {
        res.redirect('../assistant/assistant');    //redirecciona a la página principal de citas ../../asssistant/asssistant poque no sale de views
      })
   })
};

//Para cancelar la cita
assistantControl.delete = async (req, res) => {
   const idPadActual = req.params.idpadactual;
   await req.getConnection((err, conn) => {
      conn.query('update padecimiento set status = ? where  idpadactual = ?', ["CANCELADA", idPadActual], (err, dates) => {
         res.redirect('../assistant');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
    })
};

//Para guardar los datos capturados de la cita  (Modificaciones)

assistantControl.update = async (req, res) => { 
   const { idpadactual } = req.params;
   const dateModify = req.body;
   req.getConnection((err, conn) => {
     conn.query('update padecimiento set ? where idpadactual = ?', [dateModify, idpadactual], (err, dateEdit) => {
      res.redirect('../assistant');
     });
   });  
   
};


//Para buscar citas en otra fecha

assistantControl.findDates = async (req, res) => {
   const fechacita = req.body.fechacita;
   let query = '';
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
         const userAccess = req.session.user; 
          //Toma la vista de views
          res.render('../views/assistant/assistant', {   
            userAccess,
            data: citas
            
        })  
      })  
    })
};

//Para guardar paciente nuevo
  
assistantControl.savePatient = async (req, res) => {
   const data = req.body;
   console.log(data) 
   req.getConnection((err, conn) => {
     conn.query('insert into pacientes set ?', [data], (err, pacientes) => {
        res.redirect('../assistant/createDate');    //redirecciona a la página principal de citas ../../asssistant/asssistant poque no sale de views
      })
   })
};


// ******* Para páginas ******

//Para nueva cita
assistantControl.newDate = (req, res) =>{
   var doctors = null;
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
               userAccess: req.session.user,
               userAccount: req.session.cuenta,
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
   console.log(idpadactual);
   req.getConnection((err,conn) =>{
      conn.query(`select pacientes.nombrepaciente, padecimiento.fechacita, padecimiento.horacita, padecimiento.status, padecimiento.idpadactual, usuarios.nombreusuario, usuarios.cuenta from pacientes inner join padecimiento ` +
                 `on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta `+
                 `where padecimiento.idpadactual  = ?`, [idpadactual], (err, dateEdit) =>{
         if (err) { res.json(err) }
             // Convierte el valor de la fecha en texto
             dateEdit[0].fechacita = format(dateEdit[0].fechacita,'yyyy-MM-dd');
            //Asigna valores de la session 
            const userAccess = req.session.user; 
            //Toma la vista de views
            //Toma sólo 10 valores de la fecha 

            res.render('../views/assistant/updateDate', {   //usa ../views/users/users porque es primera vez que entra a vistas
              userAccess,
             data: dateEdit[0],
             title: "Modificar Cita"
            }) 
         
      })   
    }) 
}


//Para nuevopaciente
assistantControl.createPatient = (req, res) =>{
            //Toma la vista de views
            res.render('../views/assistant/createPatient', {   //usa la vista createDate
               userAccess: req.session.user,
               userAccount: req.session.cuenta,
               title: "Nuevo Paciente",
               message: ""
            }) 
    
}

module.exports = assistantControl;