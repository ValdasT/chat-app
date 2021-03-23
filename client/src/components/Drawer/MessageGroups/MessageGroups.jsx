import React, { useEffect, useState, useContext, memo } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import OneMessage from './OneMessage'
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import { useAuth } from "../../../context/AuthContext"
import { MessageContext } from '../../../context/MessageContext';
import { getFriends, getMessages } from '../../../services/ApiCalls'
import { RiEmotionSadLine } from 'react-icons/ri'

import './MessageGroups.scss'

const MessageGroups = ({ openDrawer }) => {
    const { showModal } = useContext(GlobalContext);
    const { currentUser } = useAuth()
    const { setMessages, loadingMessages, setLoadingMessages, setLoadingFriends } = useContext(MessageContext)
    const [friendsMessages, setFriendMessages] = useState([])
    const [userMessages, setUserMessages] = useState('')

    useEffect(() => {
        (async () => {
            try {
                setLoadingMessages(true)
                setLoadingFriends(true)
                let users = await getFriends(currentUser._id)
                setFriendMessages(users)
                if (users.length) {
                    await openMessage(users[0])
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

    const openMessage = async user => {
        if (user._id !== userMessages) {
            setUserMessages(user._id)
            try {
                setLoadingFriends(true)
                let messages = await getMessages(user, currentUser)
                setTimeout(() => {
                    setLoadingFriends(false)
                    setMessages(messages)
                }, 100)
            } catch (err) {
                setLoadingFriends(false)
                showModal({ type: 'error', body: err.message, name: err.response.name })
            }
        }
    }

    return (
        <div className='all-friends'>
            {!loadingMessages ? friendsMessages.length ? friendsMessages.map(friend => (
                <OneMessage
                    openDrawer={openDrawer}
                    key={friend._id}
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