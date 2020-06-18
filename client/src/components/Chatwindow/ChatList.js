import React, { useRef, Fragment, useEffect, useContext } from 'react';
import { Grid, List, Paper } from '@material-ui/core';
import ChatBubble from './ChatBubble';
import { GlobalContext } from '../../context/GlobalState';
import './Chat.css';

const Chat = () => {

    const { chatMessages } = useContext(GlobalContext)
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(scrollToBottom, [chatMessages]);
    console.log(chatMessages);
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <List component={Paper} className="messageArea">
                        {chatMessages.map(message => (<ChatBubble key={message.id} message={message} />))}
                        <div ref={messagesEndRef} />
                    </List>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Chat;