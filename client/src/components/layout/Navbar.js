import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { ArrowLeft32, ArrowRight32 } from '@carbon/icons-react';

const Navbar = () => {
    const { setshowDrawer, showDrawer } = useContext(GlobalContext)
    return (
        <Fragment>
            <button className={showDrawer ? "navbar-toggler menu-button" :
                "navbar-toggler menu-button smaller-button"}
                type="button" onClick={() => setshowDrawer(!showDrawer)}
                aria-label="Show/hide drawer" title="Show/hide drawer" >
                {showDrawer ? <ArrowLeft32 /> : <ArrowRight32 />}
            </button>
        </Fragment>
    )
}

export default Navbar;
