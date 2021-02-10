const socketio = require('socket.io');
const logger = require('../libs/utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const init = (server) => {

    const io = socketio(server);
    
    logger.info(`[${moduleName}] Initializing...`);


//     let interval;
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }

//  interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });
    
// const getApiAndEmit = socket => {
//     const response = new Date();
//     console.log(response);
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
// };
    
    
    

//   io.on('connection', (socket) => {
//     console.log('New WebSocket connection')

//     socket.on('join', (options, callback) => {
//         const { error, user } = addUser({ id: socket.id, ...options })

//         if (error) {
//             return callback(error)
//         }

//         socket.join(user.room)

//         socket.emit('message', generateMessage('Admin', 'Welcome!'))
//         socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
//         io.to(user.room).emit('roomData', {
//             room: user.room,
//             users: getUsersInRoom(user.room)
//         })

//         callback()
//     })

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id)
//         const filter = new Filter()

//         if (filter.isProfane(message)) {
//             return callback('Profanity is not allowed!')
//         }

//         io.to(user.room).emit('message', generateMessage(user.username, message))
//         callback()
//     })

//     socket.on('sendLocation', (coords, callback) => {
//         const user = getUser(socket.id)
//         io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
//         callback()
//     })

//     socket.on('disconnect', () => {
//         const user = removeUser(socket.id)

//         if (user) {
//             io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
//             io.to(user.room).emit('roomData', {
//                 room: user.room,
//                 users: getUsersInRoom(user.room)
//             })
//         }
//     })
// })

    logger.info(`[${moduleName}] Initializing... Done.`);
}

module.exports = {
    init: init
}