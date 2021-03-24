import socketIOClient from "socket.io-client";
const socket = socketIOClient();

// socket.on("FromAPI", data => {
    //     console.log(data);
    //     console.log('dddddd')
    // });
    


    socket.on('message', (message) => {
        console.log(message)
        // const html = Mustache.render(messageTemplate, {
        //     username: message.username,
        //     message: message.text,
        //     createdAt: moment(message.createdAt).format('h:mm a')
        // })
        // $messages.insertAdjacentHTML('beforeend', html)
        // autoscroll()
    })
    
    // socket.on('locationMessage', (message) => {
    //     console.log(message)
    //     const html = Mustache.render(locationMessageTemplate, {
    //         username: message.username,
    //         url: message.url,
    //         createdAt: moment(message.createdAt).format('h:mm a')
    //     })
    //     $messages.insertAdjacentHTML('beforeend', html)
    //     autoscroll()
    // })
    
    socket.on('roomData', ({ room, users }) => {

        console.log(room)
        console.log(users)
        // const html = Mustache.render(sidebarTemplate, {
        //     room,
        //     users
        // })
        // document.querySelector('#sidebar').innerHTML = html
    })
    
    // $messageForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
    
    //     $messageFormButton.setAttribute('disabled', 'disabled')
    
    //     const message = e.target.elements.message.value
    
    //     socket.emit('sendMessage', message, (error) => {
    //         $messageFormButton.removeAttribute('disabled')
    //         $messageFormInput.value = ''
    //         $messageFormInput.focus()
    
    //         if (error) {
    //             return console.log(error)
    //         }
    
    //         console.log('Message delivered!')
    //     })
    // })
    
    // $sendLocationButton.addEventListener('click', () => {
    //     if (!navigator.geolocation) {
    //         return alert('Geolocation is not supported by your browser.')
    //     }
    
    //     $sendLocationButton.setAttribute('disabled', 'disabled')
    
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         socket.emit('sendLocation', {
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude
    //         }, () => {
    //             $sendLocationButton.removeAttribute('disabled')
    //             console.log('Location shared!')  
    //         })
    //     })
    // })
const enterChat = (user, chatRoom) => {
    return new Promise((resolve, reject) => {
        console.log(user)
        console.log(chatRoom)
        let room = chatRoom._id;
        let username = user._id
        socket.emit('join', { username, room }, (err, res) => {
            if (err) {
                console.log(err)
                alert(err)
                reject(err)
            }
            resolve(res)
        })
    })
}

// const leaveChat = async () => {
//     try {
//         await socket.emit('disconnect2')
        
//     } catch (err) {
//         console.log(err)
//         alert(err)
//     }
// }

const sendMessage = async (message) => {
    return new Promise((resolve, reject) => {
            socket.emit('sendMessage', message, (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                console.log('Message delivered!')
                resolve(res)
            })
    })
}


    export {
    enterChat,
    sendMessage,
    // leaveChat
    }