import React, { memo } from "react";
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import "./CustomButtom.scss";

const CustomButton = ({
    children,
    inverted,
    icon,
    buttonSpinner,
    ...otherProps
}) => (
        <button
            className={`${inverted ? "inverted" : ""} custom-button`}
            {...otherProps}
        >
            {icon || buttonSpinner ? <div className='button-icon'>{buttonSpinner ? <SpinnerSmall /> : icon} </div> : null}
            {children}
        </button>
    );

export default memo(CustomButton);
