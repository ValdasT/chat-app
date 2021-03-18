import React, { useRef, useEffect, useContext, memo } from 'react';
import ChatBubble from './ChatBubble';
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from "../../context/AuthContext"

const ChatList = () => {

    const { chatMessages } = useContext(MessageContext)
    const { currentUser } = useAuth()
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [chatMessages]);
    return (
        <div className="message-area">
            {chatMessages.map(message =>
                (<ChatBubble key={message.id ? message.id : message._id} message={message} currentUser={currentUser} />)
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default memo(ChatList);