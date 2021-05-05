import React, { useState, useRef, useContext, memo } from 'react';
import { BiSend } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";

import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButtons/Button/CustomButton'
import EmojiPicker from './EmojiPicker/EmojiPicker'
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from "../../context/AuthContext"
import useSockets from "../UseSockets/UseSockets";
import { emojiIndex } from 'emoji-mart'
import './Chatbar.scss';

const Chatbar = () => {
    const [cursorsStartposition, setCursorsStartposition] = useState(0);
    const [cursorsEndposition, setCursorsEndposition] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');
    const { addMessage, chatDoc } = useContext(MessageContext)
    const { currentUser } = useAuth()
    const { userTyping } = useSockets();

    const inputRef = useRef(null);

    const closeEmojiPicker = () => {
        inputRef.current.focus();
        setShowEmojiPicker(false)
    }

    const handleChange = event => {
        if (event.target) {
            let { value } = event.target;
            if ((message.slice(-2).includes(':') || message.slice(-2).includes(';'))
                && value.slice(-1) === ' ' && message.slice(-2).length === 2 && !message.slice(-2).includes(' ')) {
                getEmoji(message.slice(-2), value)
            } else {
                setMessage(value);
            }
        } else {
            if (cursorsStartposition === cursorsEndposition) {
                setMessage(message.substring(0, cursorsStartposition) + event + message.substring(cursorsStartposition, message.length));
                setCursorsStartposition(cursorsStartposition + event.length)
                setCursorsEndposition(cursorsStartposition + event.length)
            } else {
                setMessage(message.substring(0, cursorsStartposition) + event + message.substring(cursorsEndposition, message.length));
                setCursorsStartposition(cursorsStartposition + event.length)
                setCursorsEndposition(cursorsStartposition + event.length)
            }
        }
    };

    const getEmoji = (str, value) => {
        let emo = emojiIndex.search(str).map((o) => o.native)
        if (emo.length) {
            setMessage(`${value.slice(0, -3)} ${emo[Math.floor(Math.random() * emo.length)]} `);
        } else {
            setMessage(value);
        }
    }

    const addEmoji = (emoji) => {
        handleChange(emoji.native)
    }

    const isUserTyping = () => {
        userTyping(currentUser, chatDoc)
    }

    const newMessage = () => {
        if (message.length) {
            if (message.length === 2 && (message.includes(':') || message.includes(';'))) {
                let smile = message;
                let emo = emojiIndex.search(message).map((o) => o.native)
                if (emo.length) {
                    smile = `${message.slice(0, -2)} ${emo[Math.floor(Math.random() * emo.length)]} `;
                }
                addMessage(smile, currentUser);
            } else {
                addMessage(message, currentUser);
            }
            setMessage('')
        }
    }

    const moveCursorToLastLoacation = e => {
        let temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    const getLasCursorLocation = e => {
        setCursorsStartposition(parseInt(e.target.selectionStart))
        setCursorsEndposition(parseInt(e.target.selectionEnd))
    }

    return (
        <div className='input-footer'>
            <div className='input-block'>
                <div className='type-field'>
                    <FormInput
                        moveCursorToLastLoacation={moveCursorToLastLoacation}
                        getLasCursorLocation={getLasCursorLocation}
                        useRef={inputRef}
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
                                <BiSend style={{ color: "#fff", fontSize: '20px' }} />
                            </CustomButton>}
                        required
                    />
                </div>
                <div className='buttons-near-field'>
                    <CustomButton
                        infield={true}
                        onClick={() => setShowEmojiPicker(true)}>
                        <VscSmiley style={{ color: "#fff", fontSize: '20px' }} />
                    </CustomButton>
                </div>
                {showEmojiPicker ? <EmojiPicker closeEmojiPicker={closeEmojiPicker} addEmoji={addEmoji} /> : null}
            </div>
        </div>
    )
}

export default memo(Chatbar);
