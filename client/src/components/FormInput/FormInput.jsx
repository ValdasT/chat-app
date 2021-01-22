import React from 'react';

import './FormInput.scss';

const FormInput = ({ handleChange, label, button, ...otherProps }) => (
    <div className='group'>
        <input autoComplete="off" className='form-input' onChange={handleChange} {...otherProps} />
        {button? button : null}
        {label ? (
            <label
                className={`${
                    otherProps.value && otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
            >
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInput;
