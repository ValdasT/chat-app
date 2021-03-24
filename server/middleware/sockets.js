const socketio = require('socket.io');
const logger = require('../libs/utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const init = (server) => {

    let users = []

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




    io.on('connection', (socket) => {
        console.log('New WebSocket connection')


        socket.on('join', (options, callback) => {
            console.log('=================1')
            console.log(options)
            console.log('dsdsdsdsdssdsdsd')
            console.log(socket.id)
            console.log('=================')
            const { error, user } = addUser({ id: socket.id, ...options })

            if (error) {
                console.log(error)
                callback(error)
            }

            socket.join(user.room)

            socket.emit('message', generateMessage(user.username, 'Welcome!'))
            socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })

            callback()
        })


        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id)

            console.log(user)
            console.log('send messssssssage')
            socket.broadcast.to(user.room).emit('message', generateMessage(user.username, message))
            io.to(user.room).emit('message', generateMessage(user.username, message))
            callback()
        })

        // socket.on('sendLocation', (coords, callback) => {
        //     const user = getUser(socket.id)
        //     io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        //     callback()
        // })

        socket.on('disconnect', () => {
            const user = removeUser(socket.id)

            if (user) {
                io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left!`))
                io.to(user.room).emit('roomData', {
                    room: user.room,
                    users: getUsersInRoom(user.room)
                })
            }
        })

        const generateMessage = (username, text) => {
            return {
                username,
                text,
                createdAt: new Date().getTime()
            }
        }

        const addUser = ({ id, username, room }) => {
            // Clean the data
            username = username.trim().toLowerCase()
            room = room.trim().toLowerCase()

            // Validate the data
            if (!username || !room) {
                return {
                    error: 'Username and room are required!'
                }
            }

            // Check for existing user
            // const existingUser = users.find((user) => {
            //     return user.room === room && user.username === username
            // })

            // // Validate username
            // if (existingUser) {
            //     return {
            //         error: 'Username is in use!'
            //     }
            // }


            //Check for existing user
            const existingUser = users.find((user) => {
                return user.username === username
            })

            // Validate username
            if (existingUser) {
                console.log(`this is user is in the list`)
                users = removeUser(username)
            }
            // Store user
            const user = { id, username, room }
            users.push(user)
            console.log(users)
            return { user }
        }

        const removeUser = (username) => {
            console.log('remove ' + username)
            const index = users.findIndex((user) => user.username === username)

            if (index !== -1) {
                console.log('<><><><><><><><' + index)
                let res = users.splice(index - 1, 1)
                return res
            } else return users
        }

        const getUsersInRoom = (room) => {
            //   room = room.trim().toLowerCase()
            let result = users.filter((user) => user.room === room)
            return result
        }

        const getUser = (id) => {
            let res = users.find((user) => user.id === id)
            return res
        }
        // const index = users.findIndex((user) => user.id === id)

        // if (index !== -1) {
        //     return users.splice(index, 1)[0]
        // }
    })

    logger.info(`[${moduleName}] Initializing... Done.`);
}

module.exports = {
    init: init
}