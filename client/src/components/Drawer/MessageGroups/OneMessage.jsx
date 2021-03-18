import React, { useContext } from 'react';
import { firstLetters } from '../../../utils/utils'
import { getMessages } from '../../../services/ApiCalls'
import { MessageContext } from '../../../context/MessageContext';


function OneMessage({ friend, openDrawer, currentUser }) {

    const { setMessages } = useContext(MessageContext)

    const openMessage = async user => {
        let messages = await getMessages(user, currentUser)
        setMessages(messages)
    }

    return (
        <div className={openDrawer ? 'one-message' : 'one-message-small'} onClick={() => openMessage(friend)}>
            <div style={{ background: friend.picColor }} className='message-picture'>{firstLetters(friend)}</div>
            <div className='message-name'>{`${friend.name} ${friend.surname ? friend.surname : ''}`}</div>
        </div>
    );
}

export default OneMessage;