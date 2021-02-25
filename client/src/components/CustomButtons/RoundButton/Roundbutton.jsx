import React, { memo } from 'react';
import './RoundButton.scss';

const RoundButton = ({ icon, text, ...otherProps }) => {
    return (
        <div className={text ? 'button-box' : null}>
            <div className='round-button' {...otherProps}>
                {icon}
            </div>
            {text ? <div className='button-lable'>{text}</div> : null}
        </div>
    )
}

export default memo(RoundButton);