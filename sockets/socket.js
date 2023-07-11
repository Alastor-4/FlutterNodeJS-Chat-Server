const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {connectedUser, disconnectedUser} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    // Verificar autenticación
    if (!valid) return client.disconnect();

    //Cliente autenticado
    connectedUser(uid);

    // Ingresar al usuario en una sala en particular
    // Sala Global, client.id
    client.join(uid);

    // Escuchar del cliente el personal-message
    client.on('personal-message', async (payload) => {
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('delete-message', async (payload) => {
        io.to(payload.to).emit('delete-message', payload.id);
    }, );


    client.on('edit-message', async (payload) => {
        io.to(payload.to).emit('edit-message', payload);
    }, );
    
    client.on('disconnect', () => {
        disconnectedUser(uid);
    });
});
