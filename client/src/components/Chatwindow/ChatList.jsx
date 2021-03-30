import React, { useRef, useEffect, useContext, memo } from 'react';
import ChatBubble from './ChatBubble';
import SpinnerSmall from '../Spinner/SpinnerSmall'
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from "../../context/AuthContext"
import { RiEmotionSadLine } from 'react-icons/ri'

const ChatList = () => {

    const { chatMessages, chatInfo, loadingMessages, loadingFriends } = useContext(MessageContext)
    const { currentUser } = useAuth()
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [chatMessages]);
    return (
        <div className="message-area">
            {loadingMessages || loadingFriends ? <div className='loading-messages'><SpinnerSmall style={{ width: '50px ', height: '50px ' }} /></div> :
                chatMessages.length ? chatMessages.map(message =>
                    (<ChatBubble key={message._id} chatInfo={chatInfo} message={message} currentUser={currentUser} />)
                ) : <div className='no-messages'>
                        <RiEmotionSadLine className='message-icon' style={{ fontSize: "30px" }} />
                        <div>There are no messages.</div>
                    </div>}

            <div ref={messagesEndRef} />
        </div>
    );
}

export default memo(ChatList);