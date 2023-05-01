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


// **** Para pantallas ****
//Para llamar a la página que agrega nuevos resgistros
usersControl.new = (req, res) =>{
        res.render('../views/users/userAdd', {titulo: "Nuevo Usuario"})    
}

//Para llamar a la página que modificar resgistros
usersControl.modify = (req, res) =>{
   res.render('userModify', {titulo: "Modificar Usuario"}) 
}

//Para llamar a la página que modificar resgistros
// usersControl.erase = (req, res) =>{
//    res.render('userErase', {titulo: "Modificar Usuario"}) 
// }


//Para procesos

//Para guardar los datos capturados en userAdd de Views  (Nuevos)

usersControl.save = (req, res) => {
    const data = req.body;
    data.nombreusuario = data.nombreusuario.toUpperCase();
    console.log(data)
    req.getConnection((err, conn) => {
      conn.query('insert into usuarios set ?', [data], (err, users) => {
         console.log(users)
         res.redirect('../users/users');    //redirecciona a la página principal de usuarios ../../users/users poque no sale de views
       })
    })
};

//Para guardar los datos capturados en userEdit de Views  (Modificaciones)

usersControl.edit = (req, res) => {
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

//Para eliminar un registro en userErease de Views  (Modificaciones)

usersControl.delete = (req, res) => {
   const userAccount = req.params.cuenta;
   req.getConnection((err, conn) => {
      conn.query('delete from usuarios where cuenta = ?', userAccount, (err, users) => {
         console.log(users)
         res.redirect('../users');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
    })
};


module.exports = usersControl;