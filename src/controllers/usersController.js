//Para la funcionalidad del servicio
const usersControl = {};

usersControl.list = (req, res) =>{
   //Se crea la conexión a la base de datos
   req.getConnection((err,conn) =>{
     conn.query('select * from usuarios order by nombreusuario', (err, users) =>{
        if (err) { res.jason(err) }
         //Toma la vista de views
        res.render('users', {
            data: users
        }) 
     })   
   })
}

//Para llamar a la página que agrega nuevos resgistros
usersControl.new = (req, res) =>{
  
        res.render('userAdd', {titulo: "Nuevo Usuario"}) 
     
}

//Para guardar los datos capturuados en userAdd de Views

usersControl.save = (req, res) => {
    const data = req.body;
    data.nombreusuario = data.nombreusuario.toUpperCase();
    console.log(data)
    req.getConnection((err, conn) => {
      conn.query('insert into usuarios set ?', [data], (err, users) => {
         console.log(users)
         res.send('guardados');
       })
    })
};
module.exports = usersControl;