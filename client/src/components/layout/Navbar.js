import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { ArrowLeft32, ArrowRight32 } from '@carbon/icons-react';

const Navbar = () => {
    const { setshowDrawer, showDrawer, darkMode } = useContext(GlobalContext)
    return (
        <Fragment>
            {darkMode? <button className={ showDrawer ? "navbar-toggler menu-button menu-button-dark" :
                "navbar-toggler menu-button smaller-button menu-button-dark"}
                type="button" onClick={() => setshowDrawer(!showDrawer)}
                aria-label="Show/hide drawer" title="Show/hide drawer" >
                {showDrawer ? <ArrowLeft32 /> : <ArrowRight32 />}
            </button> :
            <button className={ showDrawer ? "navbar-toggler menu-button menu-button-light" :
            "navbar-toggler menu-button smaller-button menu-button-light"}
            type="button" onClick={() => setshowDrawer(!showDrawer)}
            aria-label="Show/hide drawer" title="Show/hide drawer" >
            {showDrawer ? <ArrowLeft32 /> : <ArrowRight32 />}
        </button>}

        </Fragment>
    )
}

export default Navbar;
