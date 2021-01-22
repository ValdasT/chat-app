import React, { Fragment, memo } from 'react';
import { ArrowRight32 } from '@carbon/icons-react';

const Navbar = memo(({ setshowDrawer, showDrawer, darkMode }) => {

    return (
        <Fragment>
            <button
                className={darkMode ? showDrawer ? "bigger-button menu-button button-dark" :
                    "menu-button smaller-button button-dark" : showDrawer ?
                        "bigger-button menu-button button-light" :
                        " menu-button smaller-button button-light"}
                type="button" onClick={() => setshowDrawer(!showDrawer)}
                aria-label="Show/hide drawer" title="Show/hide drawer" >
                <ArrowRight32 className="round" />
            </button>
        </Fragment>
    )
})

export default Navbar;
