import React, { Fragment } from 'react';
import Chatbar from '../Chatbar/Chatbar'
import ChatList from '../Chatwindow/ChatList'
import { Paper } from '@material-ui/core';

const App = () =>

    <Fragment  >
        <ChatList />
        <Chatbar style={{ padding: '20px' }} />
    </Fragment>

export default App;
