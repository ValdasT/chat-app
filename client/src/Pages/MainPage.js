import React, { Fragment, memo } from 'react';
import Chatbar from '../components/Chatbar/Chatbar'
import ChatList from '../components/Chatwindow/ChatList'
import Drawer from '../components/Drawer/Drawer'
// import Navbar from '../components/layout/Navbar'
// import { GlobalContext } from '../../context/GlobalState';
// import { Loading } from 'carbon-components-react'

const MainPage = () => {

    return (
        <Fragment>
            <div >
                <div style={{ display: 'flex' }}>
                    <Drawer />
                    <ChatList />
                </div>
                <Chatbar />
            </div>
        </Fragment>)
}



export default memo(MainPage);
