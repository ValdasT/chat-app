import React, { Fragment } from 'react'
import './CustomSwitch.scss';
const CustomSwitch = ({...props}) => {
    return (
        <Fragment>
            <label className="label" htmlFor="toggle"><input className="input" type="checkbox" id="toggle" {...props} />
                <div className="toggle-wrapper">
                    <span className="selector"></span>
                </div>
            </label>

        </Fragment>)
}

export default CustomSwitch