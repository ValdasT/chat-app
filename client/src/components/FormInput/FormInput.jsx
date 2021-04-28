import React from 'react';

import './FormInput.scss';

const FormInput = ({ handleChange, label, useRef, button, getLasCursorLocation, moveCursorToLastLoacation, ...otherProps }) => (

    <div className='group'>
        <input autoComplete="off" className='form-input' ref={useRef} onBlur={e => getLasCursorLocation(e)} onFocus={e => moveCursorToLastLoacation(e)} onChange={handleChange} {...otherProps} />
        {button ? button : null}
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
