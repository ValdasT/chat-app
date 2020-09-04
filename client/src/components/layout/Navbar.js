import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { NextOutline32 } from '@carbon/icons-react';

const Navbar = () => {
    const { setshowDrawer, showDrawer, darkMode } = useContext(GlobalContext)
    return (
        <Fragment>
            <button className={darkMode ? showDrawer ? "navbar-toggler bigger-button menu-button menu-button-dark" :
                "navbar-toggler menu-button smaller-button menu-button-dark" : showDrawer ?
                    "navbar-toggler bigger-button menu-button menu-button-light" :
                    "navbar-toggler menu-button smaller-button menu-button-light"}
                type="button" onClick={() => setshowDrawer(!showDrawer)}
                aria-label="Show/hide drawer" title="Show/hide drawer" >
                <NextOutline32 />
            </button>
        </Fragment>
    )
}

export default Navbar;
