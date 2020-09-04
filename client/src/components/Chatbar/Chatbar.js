import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';
import { SendAlt24 } from '@carbon/icons-react';
import './Chatbar.css';

const Chatbar = () => {
    const { addMessage, getAnswer, darkMode } = useContext(GlobalContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getAnswer('hello');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const newMessage = () => {
        let lastMessage = message.trim();

        if (lastMessage.length) {
            addMessage({
                message: lastMessage
            });
            getAnswer(lastMessage);
        }
        setMessage('')
    }

    return (
        <div className={darkMode ? 'input-bar input-bar-dark' : 'input-bar input-bar-light'}>
            <TextField
                id="question-field"
                label="Type a question"
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => (e.charCode === 13 ? newMessage() : null)}
                InputLabelProps={darkMode ? {
                    className: "light-color"
                } : { className: "" }}
                InputProps={darkMode ? {
                    className: "white-color",
                    endAdornment: <InputAdornment
                        position="end">
                        <Button
                            aria-label="Send a question"
                            className=" send-btn primary-btn"
                            variant="contained"
                            color="primary"
                            onClick={newMessage}
                        >
                            <SendAlt24 />
                        </Button>
                    </InputAdornment>,
                } : {
                        className: "",
                        endAdornment: <InputAdornment
                            position="end">
                            <Button
                                aria-label="Send a question"
                                className=" send-btn primary-btn"
                                variant="contained"
                                color="primary"
                                onClick={newMessage}
                            >
                                <SendAlt24 />
                            </Button>
                        </InputAdornment>,
                    }}
            />
        </div>
    )
}

export default Chatbar;
