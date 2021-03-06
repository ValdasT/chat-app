import { useEffect, useState, useCallback } from "react";
import { userTypingString } from '../../utils/utils'
import socketIOClient from "socket.io-client";
const socket = socketIOClient();

const useSockets = () => {
    const [messageFromSocket, setMessageFromSocket] = useState({});
    const [notificationFromSocket, setNotificationFromSocket] = useState({});
    const [userTypingFromSocket, setUserTypingFromSocket] = useState(false);
    const [userTypingMessage, setUserTypingMessage] = useState([]);
    const [newChatFromSocket, setNewChatFromSocket] = useState({});
    let friendTyping = []

    useEffect(() => {
        // Listens for incoming messages
        let isMounted = true;
        socket.on('message', (message) => {
            if (isMounted) {
                if (friendTyping.length) {
                    friendTyping = friendTyping.filter(el => el.userId !== message.user.username)
                    if (!friendTyping.length) {
                        setUserTypingFromSocket(false)
                    } else {
                        setUserTypingMessage(userTypingString(friendTyping))
                    }
                }
                setMessageFromSocket(message)
            }
        })
        return () => { isMounted = false };
    }, []);

    useEffect(() => {
        // Listens for incoming notification
        let isMounted = true;
        socket.on('newNotification', (notification, newChat, currentUserId) => {
            if (isMounted) {
                setNotificationFromSocket(notification)

                if (newChat) {
                    setNewChatFromSocket(newChat)
                    //add new chat in sockets with friend
                    enterNewChat(currentUserId, [newChat._id])
                }
            }
        })
        return () => { isMounted = false };
    }, []);

    const removeElementFromArr = useCallback(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                friendTyping = friendTyping.filter(el => el.time > ((new Date().getTime()) - 1900))
                if (!friendTyping.length) {
                    setUserTypingFromSocket(false)
                } else {
                    setUserTypingMessage(userTypingString(friendTyping))
                }
                resolve()
            }, 2000)
        })
    }, [])

    useEffect(() => {
        let isMounted = true;
        (async () => {
            // Listens for user typing messages info
            socket.on('getUserTyping', async ({ userTyping }) => {
                friendTyping.push(userTyping)
                if (isMounted) {
                    if (userTypingFromSocket !== true) {
                        setUserTypingFromSocket(true)
                        setUserTypingMessage(userTypingString(friendTyping))
                    }
                    await removeElementFromArr()
                }
            })
        })()
        return () => { isMounted = false };
    }, [friendTyping, removeElementFromArr, userTypingFromSocket])

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
                resolve(res)
            })
        })
    }

    // connect to the socket server
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

    const enterNewChat = (username, rooms) => {
        return new Promise((resolve, reject) => {
            socket.emit('joinNewChat', { username, rooms }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    const disconectUser = () => {
        return new Promise((resolve, reject) => {
            socket.emit('disconnectUser', (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    const userTyping = async (user, chatRoom) => {
        return new Promise((resolve, reject) => {
            socket.emit('sendUserTyping', { user, chatRoom }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    const sendNotification = async (user, notification, newChat) => {
        return new Promise((resolve, reject) => {
            socket.emit('sendNotification', { user, notification, newChat }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    return {
        messageFromSocket,
        sendMessage,
        enterChats,
        enterNewChat,
        disconectUser,
        userTyping,
        userTypingFromSocket,
        setUserTypingFromSocket,
        userTypingMessage,
        sendNotification,
        notificationFromSocket,
        newChatFromSocket
    };
};

export default useSockets