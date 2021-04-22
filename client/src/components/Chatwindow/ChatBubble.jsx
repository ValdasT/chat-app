import React, { memo } from 'react';
import Message from './Message';
import UserPhoto from '../UserPhoto/UserPhoto'
import { showTimeFromMS } from '../../utils/utils'
import './Chat.scss';

const ChatBubble = memo(({ message, chatInfo, currentUser }) => {

    const getUserinfo = () => {
        let user = chatInfo.users.find(user => user._id === message.creator)
        return user ? user : currentUser
    }

    return (
        <div>
            {message.creator === currentUser._id ?
                <div className='message'>
                    <div className='message-block' style={{ flexDirection: "row-reverse" }}>
                        <div>
                            <UserPhoto userInfo={getUserinfo()} />
                        </div>
                        <div className="point-right"></div>
                        <div className="bubble">
                            <Message response={message} />
                        </div>
                    </div>
                    <div className="message-time" align={"right"} >{showTimeFromMS(message.createdAt)}</div>
                </div>
                :
                <div className='message'>
                    <div className='message-block'>
                        <div>
                            <UserPhoto userInfo={getUserinfo()} />
                        </div>
                        <div className="point-left"></div>
                        <div className="bubble bubble-left">
                            <Message response={message} />
                        </div>
                    </div>
                    <div className="message-time" align={"left"} >{showTimeFromMS(message.createdAt)}</div>
                </div>
            }
        </div>
    );
})

export default memo(ChatBubble);