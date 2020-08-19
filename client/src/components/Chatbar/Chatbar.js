import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';
import './Chatbar.css';

const Chatbar = () => {
    useEffect(() => {
        getAnswer('hello');
    }, [])
    const { addMessage, getAnswer , showDrawer} = useContext(GlobalContext);
    const [message, setMessage] = useState('');

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
        <div className='input-bar'>
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
    )
}

export default Chatbar;
