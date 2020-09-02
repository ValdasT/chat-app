import React, { useRef, Fragment, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import ChatBubble from './ChatBubble';
import LoadingAnswer from '../Spinner/LoadingAnswer';
import { GlobalContext } from '../../context/GlobalState';
import './Chat.css';

const Chat = () => {

    const { chatMessages, showLoadingAnswer } = useContext(GlobalContext)
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [chatMessages]);
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <div className="messageArea">
                        {chatMessages.map(message => (<ChatBubble key={message.id} message={message} />))}
                        <div ref={messagesEndRef} />
                        {showLoadingAnswer ? <LoadingAnswer /> : null}
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Chat;