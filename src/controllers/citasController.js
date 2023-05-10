//Para la funcionalidad del servicio
const usersControl = {};

usersControl.list = (req, res) =>{
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select * from usuarios order by nombreusuario', (err, users) =>{
        if (err) { res.jason(err) }
         //Toma la vista de views
        res.render('../views/users/users', {   //usa ../views/users/users porque es primera vez que entra a vistas
           
            data: users
        }) 
       
     })   
   })
}