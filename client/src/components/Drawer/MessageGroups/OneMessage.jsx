import React, { memo } from 'react';
import { firstLetters } from '../../../utils/utils'

const OneMessage = ({ friend, openDrawer, currentUser, openMessage }) => {
    const shortMessage = (lastMessage) => {
        let message = ''
        if (lastMessage.message) {
            if (lastMessage.message.length < 30) {
                message = lastMessage.creator === currentUser._id ? `You: ${lastMessage.message}` :
                    `${friend.profile.name}: ${lastMessage.message}`
            } else {
                message = lastMessage.creator === currentUser._id ? `You: ${lastMessage.message.substring(0, 30)}...` :
                    `${friend.profile.name}: ${lastMessage.message.substring(0, 30)}...`
            }
        }
        return message
    }

    return (
        <div className={openDrawer ? 'one-message' : 'one-message-small'} onClick={() => openMessage(friend)}>
            <div className='picture-space'>
                <div style={{ background: friend.profile.picColor }} className='message-picture'>{firstLetters(friend.profile)}</div>
            </div>
            <div className='chat-info'>
                <div className='message-name'>{`${friend.profile.name} ${friend.profile.surname ? friend.profile.surname : ''}`}</div>
                <div className='last-message'>{shortMessage(friend.lastMessage)}</div>
            </div>
        </div>
    );
}

export default memo(OneMessage);