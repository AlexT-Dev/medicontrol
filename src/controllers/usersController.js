


const bcrypts = require('bcrypt');  // Para encriptado de contraseñas



//Para la funcionalidad del servicio
const usersControl = {};

usersControl.list = (req, res) =>{
   //Se crea la conexión a la base de datos
   
   req.getConnection((err,conn) =>{
     conn.query('select * from usuarios order by nombreusuario', (err, users) =>{
        if (err) { res.json(err) }
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
usersControl.edit = (req, res) =>{
   const { cuenta } = req.params;
  console.log(cuenta);
   req.getConnection((err, conn) => {
     conn.query('select * from usuarios where cuenta = ?', [cuenta], (err, users) => {
       
        res.render('../views/users/userUpdate', {
           data: users[0],
           titulo: "Modificar Usuario"
        });
       
      })
     
   })
}

//Para llamar a la página que modificar resgistros
// usersControl.erase = (req, res) =>{
//    res.render('userErase', {titulo: "Modificar Usuario"}) 
// }


//Para procesos

//Para guardar los datos capturados en userAdd de Views  (Nuevos)

usersControl.save = async (req, res) => {
    const data = req.body;
    data.nombreusuario = data.nombreusuario.toUpperCase();
    data.password = await encriptarPasswords(data.password);
    console.log(data)
    req.getConnection((err, conn) => {
      conn.query('insert into usuarios set ?', [data], (err, users) => {
         console.log(users)
         res.redirect('../users/users');    //redirecciona a la página principal de usuarios ../../users/users poque no sale de views
         res.status(200).send({ message: "Usuario guardado" }) 
       })
    })
};

//Para guardar los datos capturados en userEdit de Views  (Modificaciones)

usersControl.update = async (req, res) => { 
   const { cuenta } = req.params;
   const userModify = req.body;
   userModify.nombreusuario = userModify.nombreusuario.toUpperCase();
   userModify.password = await encriptarPasswords(userModify.password);   //Encripta la password
  console.log(cuenta)
  console.log(userModify)

   req.getConnection((err, conn) => {
     conn.query('update usuarios set ? where cuenta = ?', [userModify, cuenta], (err, users) => {
      res.redirect('../users');
     });
   });  
   
};



//Para buscar el nombre 

usersControl.find = async (req, res) => {
   const userName = req.body.nombre.toUpperCase();
   let query = '';
   if (userName) {  
      //Construye el query
      query = `select * from usuarios where nombreusuario like '%${userName}%'`;
   } else {
      //Construye el query
      query = 'select * from usuarios order by nombreusuario';
   }   
   await req.getConnection((err,conn) =>{
      conn.query(query, (err, users) =>{
         if (err) { res.status(400).json({
              status: 'error',
              message: "No se encontraron registros."
             }) 
          }
         console.log(users)
          //Toma la vista de views
          res.render('../views/users/users', {   //usa ../views/users/users porque es primera vez que entra a vistas
            data: users
            
        })  
      })  
    })
};
 
//Para eliminar un registro en userErease de Views  (Modificaciones)

usersControl.delete = async (req, res) => {
   const userAccount = req.params.cuenta;
   await req.getConnection((err, conn) => {
      conn.query('update usuarios set status = ? where cuenta = ?', ["INACTIVO", userAccount], (err, users) => {
         console.log(users)
         res.redirect('../users');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
    })
};

/* Para borrado físico de la base de datos

conn.query('delete from usuarios where cuenta = ?', userAccount, (err, users) => {
         console.log(users)
         res.redirect('../users');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
       */

//Para busqueda por id (cuenta de usuario)
usersControl.getById = async (req, res) => {
   const userAccount = req.body.cuenta;
   const userPassword = req.body.password;
   await req.getConnection((err, conn) => {
      conn.query('select * from usuarios where cuenta = ? and password = ?', [userAccount, userPassword], (err, users) => {
         console.log(users)
         //Determina el tipo de usuario
         res.redirect('../users');    //redirecciona a la página principal de usuarios, sólo es ../users por se hace en la misma página
       })
    })
};




//Función paa encriptar el password

function encriptarPasswords(password) { 
   
   return bcrypts.hash(password,8)
}

//Función para validar password para tener acceso al sistema
//passwordSaved es igual al password encriptado en la base de datos, passwordAccess es igual al password que escribe el usuario al intentar ingresar al sistema

function validarEncription (passwordSaved,passwordAccess) {
   return bcrypts.compareSync(passwordAccess,passwordSaved) ? true : false;
}

module.exports = usersControl;