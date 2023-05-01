const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');



const app = express();


//Configuraciones generales

app.set('port', process.env.PORT || 3000);     //Para determinar el puerto que escucha en el servidor
app.set('view engine', 'ejs');                 // Almacenar todos los archivos del motor de plantillas /views
app.set('views', path.join(__dirname, 'views')); //Busca la carpeta donde se inicia el proyecto hasta llegar a la carpeta views sin importar el sistema operativo        

//Middelware (Funciones que se ejecutan antes de las peticiones de los usuarios)

app.use(morgan('dev'));
app.use(myConnection(mysql, {
        host: 'localhost',
        user: 'root',
    password: 'teaa701216mb1',
        port: '3306',
    database: 'especialidades'
}, 'pool'))  //Si es cliente debe ser 'single', si es administrador debe ser 'pool' 

app.use(express.urlencoded({extended: true}));  //Para que el servidor entieanda lo que se envía de los formularios a la base de datos 
                                                 //el false es para datos simples, sin imagenes o datos más complejos 

//Importando rutas

const usersRoutes = require('./routes/users.js');


//Usando rutas importadas

app.use('/', usersRoutes);   //Se cambia la ruta de acuerdo a la página que se defina como principal


//Archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

//puerto donde escucha las peticiones

app.listen(app.get('port'), () => {
   console.log('Servidor en localhost:3000');
});