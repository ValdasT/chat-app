import React, {memo} from 'react';
import './RoundButton.scss';

const RoundButton = ({ icon, ...otherProps }) => {
    return (
        <div className='round-button' {...otherProps}>
            {icon}
        </div>

    )
}

export default memo(RoundButton);