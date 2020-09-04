import React, { Fragment, useContext, useState } from 'react';
import InstanceSelection from './InstanceSelection'
import ProfileSettings from './ProfileSettings'
import { GlobalContext } from '../../context/GlobalState';
import { Tab, Tabs, Box } from '@material-ui/core';
import { UserAvatar32, Information32 } from '@carbon/icons-react';
import './Drawer.css';

const Drawer = () => {
    const { showDrawer, darkMode, setdarkMode } = useContext(GlobalContext)
    const [tab, setTab] = useState(0);

    const TabPanel = props => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    const initTab = index => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, tabIndex) => {
        setTab(tabIndex);
    }

    return (
        <Fragment>
            <div className={showDrawer ? darkMode ? 'drawer-dark drawerBox open-drawer' :
                'drawer-light drawerBox open-drawer' : darkMode ? 'drawer-dark drawerBox close-drawer' :
                    'drawer-light drawerBox close-drawer'}>
                {showDrawer ? <div className='drawerbody'>

                    <div className='row'>
                        <div className="tabs-grid col-2">
                            <Tabs
                                className="tabs-nav"
                                orientation="vertical"
                                variant="scrollable"
                                value={tab}
                                onChange={handleChange}
                                aria-label="Vertical tabs"

                            >
                                <Tab className="tabs-nav" label={<Information32 />} aria-label="Information" {...initTab(0)} />
                                <Tab className="tabs-nav" label={<UserAvatar32 />} aria-label="User profile" {...initTab(1)} />
                            </Tabs>
                        </div>

                        <div className="col-10">
                            <TabPanel value={tab} index={0} >
                                <InstanceSelection darkMode={darkMode} />
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                <ProfileSettings darkMode={darkMode} setdarkMode={setdarkMode} />
                            </TabPanel>
                        </div>
                    </div>
                </div> : null
                }
            </div>
        </Fragment>
    );
}

export default Drawer;