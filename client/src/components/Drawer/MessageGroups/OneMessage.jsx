import React from 'react';
import {firstLetters} from '../../../utils/utils'

function OneMessage({ friend, openDrawer }) {
    return (
        <div className={openDrawer ? 'one-message' : 'one-message-small'}>
            <div style={{ background: friend.picColor }} className='message-picture'>{firstLetters(friend)}</div>
            <div className='message-name'>{`${friend.name} ${friend.surname?friend.surname:''}`}</div>
        </div>
    );
}

export default OneMessage;