import React from 'react';
import './SpinnerSmall.scss';

const SpinnerSmall = ({ ...otherProps }) => {
    return (
        <div className="spinner-small" {...otherProps} ></div>
    );
}

export default SpinnerSmall;