const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();


// App de Express
const app = express();


// Lectura y parseo del Body
app.use( express.json());

app.use(cors());

app.use(morgan('dev'));


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


// Mis Rutas
app.use('/api/login', require('./routes/auth') );
app.use('/api/users', require('./routes/users') );
app.use('/api/messages', require('./routes/messages') );


// DB Config
const connect = async ()=>{
    await require('./database/config').dbConnection();
    await server.listen( process.env.PORT, ( err ) => {
        if ( err ) throw new Error(err);
    
        console.log('Servidor corriendo en puerto', process.env.PORT );
    });
 }
 connect();



