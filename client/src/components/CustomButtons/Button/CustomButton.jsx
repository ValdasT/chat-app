import React, { memo } from "react";

import "./CustomButtom.scss";

const CustomButton = ({
    children,
    isGoogleSignIn,
    inverted,
    ...otherProps
}) => (
        <button
            className={`${inverted ? "inverted" : ""} custom-button`}
            {...otherProps}
        >
            {children}
        </button>
    );

export default memo(CustomButton);
