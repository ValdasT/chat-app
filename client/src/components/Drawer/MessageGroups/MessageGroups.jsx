import React, { useEffect, useState, useContext } from 'react';
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
    const { setMessages, loadingMessages, setLoadingMessages } = useContext(MessageContext)
    const [friendsMessages, setFriendMessages] = useState([])

    useEffect(() => {
        (async () => {
            try {
                setLoadingMessages(true)
                let users = await getFriends(currentUser._id)
                setFriendMessages(users)
                if (users.length) {
                    await openMessage(users[0])
                } else {
                    setMessages({ messages: [] })
                }
                setLoadingMessages(false)
            } catch (error) {
                setLoadingMessages(false)
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const openMessage = async user => {
        let messages = await getMessages(user, currentUser)
        setMessages(messages)
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

export default MessageGroups;