import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar = () => {
    return (
        <Fragment>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6">
                        Help me Hugo!
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default Navbar;
