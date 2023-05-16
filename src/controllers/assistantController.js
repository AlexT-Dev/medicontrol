const fechaAtual = require('moment');

//Para la funcionalidad del servicio

const assistantControl = {};

assistantControl.list = (req, res) =>{
   //obtiene la fecha
   const hoy = fechaAtual().format('YYYY-MM-DD')
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select pacientes.nombrepaciente, padecimiento.horacita, padecimiento.status from pacientes inner join padecimiento ' +
                'on pacientes.idpaciente = padecimiento.idpaciente where padecimiento.fechacita = ? order by padecimiento.fechacita', [hoy], (err, citas) =>{
        if (err) { res.jason(err) }
         //Toma la vista de views
        res.render('../views/assistant/assistant', {   //usa ../views/users/users porque es primera vez que entra a vistas
           
            data: citas
        }) 
       
     })   
   })
}


module.exports = assistantControl;