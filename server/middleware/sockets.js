const socketio = require('socket.io');
const logger = require('../libs/utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const init = (server) => {

    let users = []

    const io = socketio(server);

    logger.info(`[${moduleName}] Initializing sockets...`);

    io.on('connection', (socket) => {
        console.log(`New WebSocket connection: ${socket.id}`)


        socket.on('join', (options, callback) => {

            const { error, users } = addUser({ id: socket.id, ...options })

            if (error) {
                console.log(error)
                callback(error)
            }

            if (options && options.rooms) {
                options.rooms.forEach(room => {
                    socket.join(room)
                    // socket.emit('message', generateMessage(user.username, 'Welcome!'))
                    // socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined!`))
                    // io.to(user.room).emit('roomData', {
                    //     room: user.room,
                    //     users: getUsersInRoom(user.room)
                    // })
                })

                // add user as room to send basic notifications
                socket.join(options.username)
            }

            callback()
        })


        socket.on('sendMessage', ({ message, chatRoom }, callback) => {
            const user = getUser(socket.id, chatRoom._id)
            // socket.broadcast.to(user.room).emit('message', generateMessage(user.username, message))
            if (user) {
                io.to(user.room).emit('message', { user, message })
            }
            callback()
        })

        socket.on('sendUserTyping', ({ user, chatRoom }, callback) => {
            const userTyping = {
                room: chatRoom._id,
                userName: user.name,
                userId: user._id,
                time: new Date().getTime()
            }
            socket.broadcast.to(chatRoom._id).emit('getUserTyping', { userTyping })
            // io.to(chatRoom._id).emit('getUserTyping', {userTyping})
            callback()
        })

        socket.on('sendNotification', ({ user, notification }, callback) => {
            const userRoomInfo = getUser(undefined, notification.notifiee)
            if (userRoomInfo) {
                socket.broadcast.to(userRoomInfo.room).emit('newNotification', { notification })
            }
            callback()
        })

        // socket.on('sendLocation', (coords, callback) => {
        //     const user = getUser(socket.id)
        //     io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        //     callback()
        // })

        socket.on('disconnect', () => {
            const user = removeUsers(socket.id)
            // console.log(`remove user` + user.username)

            if (user) {
                io.to(user.room).emit('message', `${user.username} has left!`)
                // io.to(user.room).emit('roomData', {
                //     room: user.room,
                //     users: getUsersInRoom(user.room)
                // })
            }
        })

        const addUser = ({ id, username, rooms }) => {
            // Clean the data
            username = username.trim().toLowerCase()

            // Validate the data
            if (!username || !rooms) {
                return {
                    error: 'Username and room are required!'
                }
            }

            if (rooms.length) {
                rooms.forEach(room => {
                    room = room.trim().toLowerCase()
                    let user = { id, username, room }
                    users.push(user)

                })
            }

            //add user as room for basic notifications
            users.push({ id, username, room: username })
            return { users }
        }

        const removeUsers = (id) => {
            console.log('remove ' + id)
            users = users.filter(user => user.id !== id)
            console.log(users)
            return users
            // const index = users.findIndex((user) => user.username === username)

            // if (index !== -1) {
            //     console.log('<><><><><><><><' + index)
            //     let res = users.splice(index - 1, 1)
            //     return res
            // } else return users
        }


        const getUser = (id, room) => {
            let res
            if (id) {
                res = users.find((user) => user.id === id && user.room === room)
            } else {
                res = users.find((user) => user.room === room)
            }
            return res
        }

    })

    logger.info(`[${moduleName}] Initializing sockets... Done.`);
}

module.exports = {
    init: init
}