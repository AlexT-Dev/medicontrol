const fechaAtual = require('moment');

//Para la funcionalidad del servicio

const assistantControl = {};

assistantControl.list = (req, res) =>{
   //obtiene la fecha
   const hoy = fechaAtual().format('YYYY-MM-DD')
   //Se crea la conexión a la base de datos, pertenece al caso de uso: Buscar citas de hoy
   req.getConnection((err,conn) =>{
     conn.query('select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status, usuarios.nombreusuario from pacientes inner join padecimiento ' +
                'on pacientes.idpaciente = padecimiento.idpaciente inner join usuarios on usuarios.cuenta = padecimiento.cuenta where padecimiento.fechacita = ? '+
                'order by padecimiento.fechacita', [hoy], (err, citas) =>{
        if (err) { res.json(err) }
        
           //Asigna valores de la session
           const userAccess = req.session.user; 
           //Toma la vista de views
           res.render('../views/assistant/assistant', {   //usa ../views/users/users porque es primera vez que entra a vistas
            userAccess,
            data: citas
           }) 
       
     })   
   })
}

assistantControl.newDate = (req, res) =>{
   
 res.render('../views/assistant/createDate', {
    title: "Nueva Cita",
   message: "",
   userAccess: req.session.user

 })
}



module.exports = assistantControl;