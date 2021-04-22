import React, { memo } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { firstLetters } from '../../utils/utils'
import './UserPhoto.scss';

const UserPhoto = memo(({ userInfo }) => {
    return (
        // <img className='userAvatar' id={`Hugo avatar ${uuidv4()} `} alt={currentUser.name} src={logo} />
        <div className='picture-block'>
            <div style={{ background: userInfo.picColor }} className='picture'>{firstLetters(userInfo)}</div>
        </div>
    );
})

export default memo(UserPhoto);