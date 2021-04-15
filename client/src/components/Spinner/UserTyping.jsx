import React, { memo } from 'react';
import './UserTyping.scss';

const UserTyping = memo(() => {

    return (
        <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
    );
})

export default UserTyping;