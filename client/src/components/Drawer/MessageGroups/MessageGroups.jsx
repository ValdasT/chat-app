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

const MessageGroups = ({ openDrawer }) => {
    const { showModal } = useContext(GlobalContext);
    const { currentUser } = useAuth()
    const { setMessages, loadingMessages, setLoadingMessages, setLoadingFriends } = useContext(MessageContext)
    const [chatsAndMessages, setChatsAndMessages] = useState([])
    const [userMessages, setUserMessages] = useState('')
    const { messageFromSocket } = useSockets();

    useEffect(() => {
        (async () => {
            try {
                setLoadingMessages(true)
                setLoadingFriends(true)
                let chats = await getChats(currentUser._id)
                if (chats.length) {
                    setChatsAndMessages(chats)
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
        if (messageFromSocket && messageFromSocket.user) {
            chatsAndMessages.map(e => {
                if (e._id === messageFromSocket.user.room) {
                    return e.message = messageFromSocket.message
                } return e
            })
            chatsAndMessages.sort((a, b) => a.message.createdAt.localeCompare(b.message.createdAt) || a._id.localeCompare(b._id)).reverse()
        }

    }, [messageFromSocket, chatsAndMessages])

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
            {!loadingMessages ? chatsAndMessages.length ? chatsAndMessages.map(chat => (
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
                        <div>Friends list is empty.</div>
                    </div> : null
                : <SpinnerSmall style={{ width: '50px ', height: '50px ' }} />}
        </div>
    );
}

export default memo(MessageGroups);