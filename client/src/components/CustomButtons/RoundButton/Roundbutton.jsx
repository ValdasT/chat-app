import React, {memo} from 'react';
import './RoundButton.scss';

const RoundButton = ({ icon }) => {
    return (
        <div className='round-button'>
            {icon}
        </div>

    )
}

export default memo(RoundButton);