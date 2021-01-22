import React, { useRef, useEffect, useContext, memo } from 'react';
import ChatBubble from './ChatBubble';
import { MessageContext } from '../../context/MessageContext';

const Chat = () => {

    const { chatMessages } = useContext(MessageContext)
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [chatMessages]);
    return (
        <div className="message-area">
            {console.log(chatMessages)}
            {chatMessages.map(message => (<ChatBubble key={message.id} message={message} />))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default memo(Chat);