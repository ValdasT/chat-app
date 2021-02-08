import React, { Fragment, memo } from 'react';
import Chatbar from '../components/Chatbar/Chatbar'
import ChatList from '../components/Chatwindow/ChatList'
import Drawer from '../components/Drawer/Drawer'

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
