const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
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

//routes (Para as peticiones)


//puerto donde escucha las peticiones

app.listen(app.get('PORT'), () => {
   console.log('Servidor en localhost:3000');
});