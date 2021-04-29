import React, { Fragment, useState, memo } from 'react';
import MessageGroups from './MessageGroups/MessageGroups'
import { IoIosArrowForward } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
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

    const clearField = () => {
        setSearchValue('')
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
                                    button={
                                        <div onClick={clearField} className='search-button'>
                                            {searchValue.length ? <VscClose /> : <BiSearchAlt />}
                                        </div>
                                    }
                                />
                            </div> : null}
                        <div>
                            <div className='message-groups'>
                                <MessageGroups openDrawer={openDrawer} searchValue={searchValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
})

export default Drawer;