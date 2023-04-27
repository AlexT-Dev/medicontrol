//Para la funcionalidad del servicio
const controller = {};

controller.list = (req, res) =>{
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select * from usuarios', (err, users) =>{
        if (err) { res.jason(err) }
        console.log(users);
         //Toma la vista de views
        res.render('users', {
            data: users
        }) 
     })   
   })
}

module.exports = controller;