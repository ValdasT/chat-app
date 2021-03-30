import React, { useEffect, useState, useContext, memo } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import OneMessage from './OneMessage'
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import { useAuth } from "../../../context/AuthContext"
import { MessageContext } from '../../../context/MessageContext';
import { getFriends, getMessages } from '../../../services/ApiCalls'
import { RiEmotionSadLine } from 'react-icons/ri'
import useSockets from "../../UseSockets/UseSockets";

import './MessageGroups.scss'

const MessageGroups = ({ openDrawer }) => {
    const { showModal } = useContext(GlobalContext);
    const { currentUser } = useAuth()
    const { setMessages, loadingMessages, setLoadingMessages, setLoadingFriends } = useContext(MessageContext)
    const [friendsAndMessages, setFriendsAndMessages] = useState([])
    const [userMessages, setUserMessages] = useState('')
    const { messageFromSocket } = useSockets();

    useEffect(() => {
        (async () => {
            try {
                setLoadingMessages(true)
                setLoadingFriends(true)
                let friends = await getFriends(currentUser._id)
                setFriendsAndMessages(friends)
                if (friends.length) {
                    await openMessage(friends[0])
                } else {
                    setMessages(currentUser, { messages: [] })
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
            friendsAndMessages.map(e => {
                if (e.chatId === messageFromSocket.user.room) {
                    return e.lastMessage = messageFromSocket.message
                } return e
            })
            friendsAndMessages.sort((a, b) => a.lastMessage.createdAt.localeCompare(b.lastMessage.createdAt) || a.chatId.localeCompare(b.chatId)).reverse()
        }

    }, [messageFromSocket, friendsAndMessages])

    const openMessage = async user => {
        if (user.profile._id !== userMessages) {
            setUserMessages(user.profile._id)
            try {
                setLoadingFriends(true)
                let messages = await getMessages(user.profile, currentUser)
                setTimeout(() => {
                    setLoadingFriends(false)
                    setMessages(currentUser, messages)
                }, 100)
            } catch (err) {
                setLoadingFriends(false)
                showModal({ type: 'error', body: err.message, name: err.response.name })
            }
        }
    }

    return (
        <div className='all-friends'>
            {!loadingMessages ? friendsAndMessages.length ? friendsAndMessages.map(friend => (
                <OneMessage
                    openDrawer={openDrawer}
                    currentUser={currentUser}
                    key={friend.profile._id}
                    friend={friend}
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