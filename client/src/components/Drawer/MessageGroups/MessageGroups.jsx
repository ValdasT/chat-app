import React, { useEffect, useState, useContext, memo } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import OneMessage from './OneMessage'
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import { useAuth } from "../../../context/AuthContext"
import { MessageContext } from '../../../context/MessageContext';
import { getChats, getMessages } from '../../../services/ApiCalls'
import { RiEmotionSadLine } from 'react-icons/ri'
import useSockets from "../../UseSockets/UseSockets";

import './MessageGroups.scss'

const MessageGroups = ({ openDrawer, searchValue }) => {
    const { showModal } = useContext(GlobalContext);
    const { currentUser } = useAuth()
    const { setMessages, loadingMessages, setLoadingMessages, setLoadingFriends } = useContext(MessageContext)
    const [chatsAndMessages, setChatsAndMessages] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [userMessages, setUserMessages] = useState('')
    const { messageFromSocket, newChatFromSocket } = useSockets();

    useEffect(() => {
        (async () => {
            try {
                setLoadingMessages(true)
                setLoadingFriends(true)
                let chats = await getChats(currentUser._id)
                if (chats.length) {
                    setChatsAndMessages(chats)
                    setSearchResults(chats)
                    await openMessage(chats[0])
                } else {
                    setMessages({ messages: [] })
                }
                setLoadingMessages(false)
                setLoadingFriends(false)
            } catch (error) {
                setLoadingMessages(false)
                setLoadingFriends(false)
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    useEffect(() => {
        if (Object.keys(newChatFromSocket).length !== 0) {
            let userWithOutCurrentUser = []
            newChatFromSocket.users.forEach(user => {
                if (user._id.toString() !== currentUser._id.toString()) {
                    userWithOutCurrentUser.push({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        surname: user.surname,
                        picColor: user.picColor
                    })
                }
            })
            let chat = {
                _id: newChatFromSocket._id,
                users: userWithOutCurrentUser,
                message: {
                    message: '',
                    createdAt: '0'
                },
                createdAt: newChatFromSocket.createdAt
            }
            setSearchResults([chat, ...searchResults])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newChatFromSocket])

    useEffect(() => {
        if (messageFromSocket && messageFromSocket.user) {
            chatsAndMessages.map(e => {
                if (e._id === messageFromSocket.user.room) {
                    return e.message = messageFromSocket.message
                } return e
            })
            chatsAndMessages.sort((a, b) => a.message.createdAt.localeCompare(b.message.createdAt) || a._id.localeCompare(b._id)).reverse()
        }

    }, [messageFromSocket, chatsAndMessages])

    useEffect(() => {
        if (chatsAndMessages && chatsAndMessages.length) {
            let newsSearchResults = chatsAndMessages.filter(element => {
                return element.users.some(subElement => {
                    let name = subElement.name.toLowerCase() + ` ${subElement.surname ? subElement.surname.toLowerCase() : ''}`
                    let search = searchValue.toLowerCase()
                    return name.includes(search)
                });
            });
            setSearchResults(newsSearchResults)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])


    const openMessage = async chat => {
        if (chat._id !== userMessages) {
            setUserMessages(chat._id)
            try {
                setLoadingFriends(true)
                let messages = await getMessages(chat._id)
                setTimeout(() => {
                    setLoadingFriends(false)
                    setMessages(messages, chat)
                }, 100)
            } catch (err) {
                setLoadingFriends(false)
                showModal({ type: 'error', body: err.message, name: err.response.name })
            }
        }
    }

    return (
        <div className='all-friends'>
            {!loadingMessages ? searchResults.length ? searchResults.map(chat => (
                <OneMessage
                    openDrawer={openDrawer}
                    currentUser={currentUser}
                    key={chat._id}
                    chat={chat}
                    openMessage={openMessage} />)) :
                openDrawer ?
                    <div className='no-friends'>
                        <div>
                            <RiEmotionSadLine className='message-icon' />
                        </div>
                        <div>{searchValue ? `Can't find anything.` : `Friends list is empty.`}</div>
                    </div> : null
                : <SpinnerSmall style={{ width: '50px ', height: '50px ' }} />}
        </div>
    );
}

export default memo(MessageGroups);