import React, { Fragment } from 'react';
import { Grid, ListItem, Avatar } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import './Chat.css';

const ChatBubble = ({ message }) => {
    return (
        <Fragment>
            <ListItem>
                <Grid container>
                    <Grid item xs={12} className={message.sender === 'hugo' ? "d-flex" : "d-flex flex-row-reverse"}>
                        <div>
                            {message.sender === 'hugo' ? <Avatar alt="Hugo bot" src={require("../../img/hugo_logo.svg")} />
                                : <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />}
                        </div>
                        <div className={message.sender === 'hugo' ? "bubble bubble-left" : "bubble bubble-right"}>{ReactHtmlParser(message.message)}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="messageTime" align={message.sender === 'hugo' ? "left" : "right"} >{message.time}</div>
                    </Grid>
                </Grid>
            </ListItem>
        </Fragment>
    );
}

export default ChatBubble;