import React, { memo } from 'react';
import './LoadingAnswer.css';

const LoadingAnswer = memo(() => {

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

export default LoadingAnswer;