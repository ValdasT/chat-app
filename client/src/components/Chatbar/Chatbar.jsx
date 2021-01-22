import React, { useState, useContext, useCallback, memo } from 'react';
import { FiSend } from "react-icons/fi";

import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButtons/Button/CustomButton'
// import { GlobalContext } from '../../context/GlobalState';
// import { useUserSession } from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';
import './Chatbar.scss';

const Chatbar = () => {
    const [message, setMessage] = useState('');
    const { addMessage } = useContext(MessageContext)

    const FiSendIcon = memo(FiSend)
    const handleChange = useCallback(event => {
        const { value } = event.target;
        setMessage(value);
    }, [message]);

    const newMessage = useCallback(() => {
        if (message.length) {
            addMessage(message);
            setMessage('')
        }
    }, [message])

    return (
        <div className='input-footer'>
            <div className='input-block'>
                <FormInput
                    style={{ paddingRight: '110px' }}
                    type='text'
                    name='messageInput'
                    value={message}
                    onChange={handleChange}
                    label='Message'
                    onKeyPress={(e) => (e.charCode === 13 ? newMessage() : null)}
                    button={
                        <CustomButton
                            style={{ marginTop: '12px', position: 'absolute', right: '5px', width: '40px' }}
                            onClick={() => newMessage()}>
                            <FiSendIcon size="20px" style={{ color: "#fff" }} />
                        </CustomButton>}
                    required
                />
            </div>
        </div>
    )
}

export default memo(Chatbar);
