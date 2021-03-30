import React, { memo } from 'react';
import Message from './Message';
import LoadingAnswer from '../Spinner/LoadingAnswer';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../img/profile.jpeg'
import otherLogo from '../../img/profile2.jpg'
import { showTimeFromMS } from '../../utils/utils'
import './Chat.scss';

const ChatBubble = memo(({ message, chatInfo, currentUser }) => {
    return (
        <div>
            {message.creator === currentUser._id ?
                <div className='message'>
                    <div className='message-block' style={{ flexDirection: "row-reverse" }}>
                        <div>
                            <img className='userAvatar' id={`Hugo avatar ${uuidv4()} `} alt={currentUser.name} src={logo} />
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
                            <img className='userAvatar' id={`Profile avatar ${uuidv4()} `} alt={`first-name last-name`}
                                src={otherLogo} />
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