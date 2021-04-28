import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Picker } from 'emoji-mart'
import './Emoji.scss'

const EmojiPicker = ({ closeEmojiPicker, addEmoji }) => {
    const { themeState } = useContext(GlobalContext);

    return (
        <div>
            <div className="close-emoji-picker" onClick={() => closeEmojiPicker()}></div>
            <Picker title='Pick your emoji…' emoji='point_up' emojiTooltip={false} theme={themeState ? 'light' : 'dark'}
                onSelect={(e) => addEmoji(e)} />
        </div>
    );
}

export default EmojiPicker;