import React, { useState, useContext, memo } from 'react';
import { FiSend } from "react-icons/fi";

import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButtons/Button/CustomButton'
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from "../../context/AuthContext"
import useSockets from "../UseSockets/UseSockets";
import './Chatbar.scss';

const Chatbar = () => {
    const [message, setMessage] = useState('');
    const { addMessage, chatDoc } = useContext(MessageContext)
    const { currentUser } = useAuth()
    const { userTyping } = useSockets();

    const FiSendIcon = FiSend
    const handleChange = event => {
        const { value } = event.target;
        setMessage(value);
    };

    const isUserTyping = () => {
        userTyping(currentUser, chatDoc)
    }

    const newMessage = () => {
        if (message.length) {
            addMessage(message, currentUser);
            setMessage('')
        }
    }

    return (
        <div className='input-footer'>
            <div className='input-block'>
                <FormInput
                    style={{ paddingRight: '40px' }}
                    type='text'
                    name='messageInput'
                    value={message}
                    onChange={handleChange}
                    label='Message'
                    onKeyPress={(e) => (e.charCode === 13 ? newMessage() : isUserTyping())}
                    button={
                        <CustomButton
                            infield={true}
                            onClick={() => newMessage()}>
                            <FiSendIcon style={{ color: "#fff" }} />
                        </CustomButton>}
                    required
                />
            </div>
        </div>
    )
}

export default memo(Chatbar);
