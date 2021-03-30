import { useEffect, useState, useCallback } from "react";

import socketIOClient from "socket.io-client";
const socket = socketIOClient();

const useSockets = () => {
    const [messageFromSocket, setMessageFromSocket] = useState({});

    useEffect(() => {

        // Listens for incoming messages
        socket.on('message', (message) => {
            setMessageFromSocket(message)
        })

    }, []);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = async (message, chatRoom) => {
        return new Promise((resolve, reject) => {
            socket.emit('sendMessage', { message, chatRoom }, (err, res) => {
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

    const enterChats = (user) => {
        return new Promise((resolve, reject) => {
            let rooms = user.chats;
            let username = user._id
            socket.emit('join', { username, rooms }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    return { messageFromSocket, sendMessage, enterChats };
};

export default useSockets