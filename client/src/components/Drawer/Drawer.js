import React, { Fragment, useContext, useState, useEffect, memo } from 'react';
// import { updateUser } from '../../context/ApiCalls'
// import { GlobalContext } from '../../context/GlobalState';
// import { useUserSession } from '../../context/AuthContext';
// import { MostlyCloudyNight32, MostlyCloudy32, Settings32, Information16 } from '@carbon/icons-react';
import { IoIosArrowForward } from 'react-icons/io';

import './Drawer.scss';

const Drawer = memo(() => {
    const [openDrawer, setOpendDrawer] = useState(true);
    // const { darkMode, setDarkMode, setSpinner, showAlert } = useContext(GlobalContext)
    // const { user, setUser } = useUserSession()
    // const [tab, setTab] = useState(0);
    const openCloseDrawer = () => {
        setOpendDrawer(!openDrawer)
    }

    return (
        <Fragment>
            <div className={openDrawer ?
                'drawerBox open-drawer' :
                'drawerBox close-drawer'}>
                <div className='drawerbody'>
                    <div>
                        <div  onClick={openCloseDrawer} className='expand-button'>
                            <IoIosArrowForward className={openDrawer ? 'open-button' : 'close-button'} />
                        </div>
                        <div>
                            {/* dkmsdklf mskldmf klsdmf klsdmf klsdm flks dmf sdf sdfk smdfklsdmflksd mflkms dlkfmsdkl fmsd klmfksl dmfkls dmfkl smdklfm sdklm fsdkl fmksld mfkl smd */}
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
})

export default Drawer;