import React, { memo } from "react";

import "./CustomButtom.scss";

const CustomButton = ({
    children,
    inverted,
    icon,
    ...otherProps
}) => (
        <button
            className={`${inverted ? "inverted" : ""} custom-button`}
            {...otherProps}
        >
            {icon ? <div className='button-icon'>{icon}</div> : null}
            {children}
        </button>
    );

export default memo(CustomButton);
