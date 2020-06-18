import React, { Fragment, useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';
import './Chatbar.css';

const Chatbar = () => {
    const { addMessage, getAnswer } = useContext(GlobalContext);
    const [message, setMessage] = useState('');

    const newMessage = () => {
        let lastMessage = message.trim();

        if (lastMessage.length) {
            addMessage({
                message: lastMessage,
                sender: 'me',
            });
        }
        getAnswer();
        setMessage('')
    }

    return (
        <Fragment>
            <div className="input-bar">
                <TextField
                    id="question-field"
                    label="Type a question"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => (e.charCode === 13 ? newMessage() : null)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Button
                            variant="contained"
                            color="primary"
                            style={{ padding: "8px 30px" }}
                            onClick={newMessage}
                        >
                            <i className="fas fa-paper-plane fa-lg"></i>
                        </Button>
                        </InputAdornment>,
                    }}
                />
            </div>
        </Fragment>
    )
}

export default Chatbar;
