import React, { useRef, useEffect, useContext, memo } from 'react';
import ChatBubble from './ChatBubble';
import UserTyping from '../Spinner/UserTyping'
import SpinnerSmall from '../Spinner/SpinnerSmall'
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from "../../context/AuthContext"
import { RiEmotionSadLine, RiTestTubeFill } from 'react-icons/ri'
import useSockets from "../UseSockets/UseSockets";

const ChatList = () => {

    const { chatMessages, chatInfo, loadingMessages, loadingFriends } = useContext(MessageContext)
    const { currentUser } = useAuth()
    const { userTypingFromSocket, userTypingMessage } = useSockets();

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [chatMessages, userTypingFromSocket]);

    return (
        <div className="message-area">
            {loadingMessages || loadingFriends ? <div className='loading-messages'><SpinnerSmall style={{ width: '50px ', height: '50px ' }} /></div> :
                <div>
                    {chatMessages.length ? chatMessages.map(message =>
                        (<ChatBubble key={message._id} chatInfo={chatInfo} message={message} currentUser={currentUser} />)
                    ) : <div className='no-messages'>
                            <RiEmotionSadLine className='message-icon' style={{ fontSize: "30px" }} />
                            <div>There are no messages.</div>
                        </div>}
                    {userTypingFromSocket && userTypingMessage.map(e => { if (e.room === chatInfo._id) return e.message })[0] ?
                        <div className='user-typing-container'>
                            <div className='user-typing-text'>{userTypingMessage.map(e => { if (e.room === chatInfo._id) return e.message })}:</div>
                            <UserTyping />
                        </div> : null}
                </div>}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default memo(ChatList);