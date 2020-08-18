import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Navbar = () => {
    const { setshowDrawer, showDrawer } = useContext(GlobalContext)
    return (
        <Fragment>
            <nav className="navbar fixed-top navbar-light bg-light">
                <button className="navbar-toggler" type="button"
                    onClick={() => setshowDrawer(!showDrawer)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </Fragment>
    )
}

export default Navbar;
