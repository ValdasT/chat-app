import React, { Fragment, useContext } from 'react';
import Chatbar from '../Chatbar/Chatbar'
import ChatList from '../Chatwindow/ChatList'
import Drawer from '../Drawer/Drawer'
import { GlobalContext } from '../../context/GlobalState';

const MainPage = () => {

    const { setshowDrawer, showDrawer } = useContext(GlobalContext)
    return (<Fragment>
        <div className="row">
            {showDrawer ? <div className="col-md-4" >
                <Drawer />
            </div> : null}
            <div className={showDrawer ? "col-md-8" : 'col-md-12'} >
                <ChatList />
                <div >
                    <Chatbar style={{ padding: '20px' }} />
                </div>
            </div>
        </div>
    </Fragment>)
}



export default MainPage;
