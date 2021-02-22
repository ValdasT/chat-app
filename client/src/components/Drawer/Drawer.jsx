import React, { Fragment, useState, memo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi'
import FormInputSmall from '../FormInput/FormInputSmall';

import './Drawer.scss';

const Drawer = memo(() => {
    const [openDrawer, setOpendDrawer] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const openCloseDrawer = () => {
        setOpendDrawer(!openDrawer)
    }

    const handleChange = event => {
        const { value } = event.target;
        setSearchValue(value);
    };

    const search = () => {
        if (searchValue.length) {
            console.log(searchValue);
        }
    }

    return (
        <Fragment>
            <div className={openDrawer ?
                'drawerBox open-drawer' :
                'drawerBox close-drawer'}>
                <div className='drawerbody'>
                    <div>
                        <div onClick={openCloseDrawer} className='expand-button'>
                            <IoIosArrowForward className={openDrawer ? 'open-button' : 'close-button'} />
                        </div>
                        {openDrawer ?
                            <div>
                                <FormInputSmall
                                    style={{ paddingRight: '30px' }}
                                    type='text'
                                    name='messageInput'
                                    value={searchValue}
                                    onChange={handleChange}
                                    label='Search'
                                    onKeyPress={(e) => (e.charCode === 13 ? search() : null)}
                                    button={
                                        <div onClick={search} className='search-button'>
                                            <BiSearchAlt />
                                        </div>
                                    }
                                />
                            </div> : null}
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