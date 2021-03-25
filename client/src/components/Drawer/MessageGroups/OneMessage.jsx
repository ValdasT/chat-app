import React, { memo } from 'react';
import { firstLetters } from '../../../utils/utils'

const OneMessage = ({ friend, openDrawer, openMessage }) => {

    return (
        <div className={openDrawer ? 'one-message' : 'one-message-small'} onClick={() => openMessage(friend)}>
            <div className='picture-space'>
                <div style={{ background: friend.picColor }} className='message-picture'>{firstLetters(friend)}</div>
            </div>
            <div className='message-name'>{`${friend.name} ${friend.surname ? friend.surname : ''}`}</div>
        </div>
    );
}

export default memo(OneMessage);