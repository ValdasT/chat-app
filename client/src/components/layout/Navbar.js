import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Navbar = () => {
    const { setshowDrawer, showDrawer } = useContext(GlobalContext)
    return (
        <Fragment>
            <button className="navbar-toggler navbar-light menu-button " type="button"
                onClick={() => setshowDrawer(!showDrawer)}>
                <i class="fas fa-chevron-right"></i>
            </button>
        </Fragment>
    )
}

export default Navbar;
