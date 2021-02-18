import React from 'react';

import './FormInputSmall.scss';

const FormInputSmall = ({ handleChange, label, button, ...otherProps }) => (
    <div className='group-small'>
        <input autoComplete="off" className='form-input-small' onChange={handleChange} {...otherProps} />
        {button? button : null}
        {label ? (
            <label
                className={`${
                    otherProps.value && otherProps.value.length ? 'shrink' : ''
                    } form-input-small-label`}
            >
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInputSmall;
