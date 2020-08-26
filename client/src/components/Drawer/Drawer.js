import React, { Fragment, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Tab, Tabs, Typography, Box } from '@material-ui/core';
import { UserAvatar32, Information32 } from '@carbon/icons-react';
import './Drawer.css';

const Drawer = () => {
    const { showDrawer } = useContext(GlobalContext)
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
                        <Typography>{children}</Typography>
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
            <div className={showDrawer ? 'drawerBox open-drawer' : 'drawerBox close-drawer'}>
                {showDrawer ? <div className='drawerbody'>

                    <div className='row'>
                        <div className="tabs-grid">
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

                        <div className="tabs-information">
                            <TabPanel value={tab} index={0}>
                                KB info askdm askld jasldl asdl;a skdl;k asl;dka ls;dk;la skdl;a skl;daks ;ldkasl; dkasl; dka;ls kdl;as kdl;a skl;dkasl;dka sl;kdl;a skdl;a skdl; askdl;a ksdl;a ksldkasl;dksdkjgkl sfjgkl sjflkg jfslkg jsf
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                Profile info
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