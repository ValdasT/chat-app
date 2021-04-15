import React, { memo } from 'react';
import { firstLetters } from '../../../utils/utils'

const OneMessage = ({ chat, openDrawer, currentUser, openMessage }) => {
    const shortMessage = (lastMessage) => {
        let message = ''
        if (lastMessage && lastMessage.message) {
            if (lastMessage.message.length < 30) {
                message = lastMessage.creator === currentUser._id ? `You: ${lastMessage.message}` :
                    `${chat.users[0].name}: ${lastMessage.message}`
            } else {
                message = lastMessage.creator === currentUser._id ? `You: ${lastMessage.message.substring(0, 30)}...` :
                    `${chat.users[0].name}: ${lastMessage.message.substring(0, 30)}...`
            }
        }
        return message
    }

    return (
        <div>
            {chat.length > 0 ? 'GROUP CHAT!' :
                <div className={openDrawer ? 'one-message' : 'one-message-small'} onClick={() => openMessage(chat)}>
                    <div className='picture-space'>
                        <div style={{ background: chat.users[0].picColor }} className='message-picture'>{firstLetters(chat.users[0])}</div>
                    </div>
                    <div className='chat-info'>
                        <div className='message-name'>{`${chat.users[0].name} ${chat.users[0].surname ? chat.users[0].surname : ''}`}</div>
                        <div className='last-message'>{shortMessage(chat.message)}</div>
                    </div>
                </div>}
        </div>
    );
}

export default memo(OneMessage);