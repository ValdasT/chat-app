import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import OneMessage from './OneMessage'
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import { useAuth } from "../../../context/AuthContext"
import { getFriends } from '../../../services/ApiCalls'

import './MessageGroups.scss'

function MessageGroups({ openDrawer }) {
    const { showModal } = useContext(GlobalContext);
    const { currentUser } = useAuth()
    const [friendsMessages, setFriendMessages] = useState([])

    useEffect(() => {
        (async () => {
            try {
                let users = await getFriends(currentUser.friends, currentUser._id)
                setFriendMessages(users)
                console.log(users)
            } catch (error) {
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return (
        <div className='all-friends'>
            {friendsMessages.length ? friendsMessages.map(friend => (<OneMessage openDrawer={openDrawer} key={friend._id} friend={friend} />)) :
                <SpinnerSmall style={{ width: '50px ', height: '50px ' }} />}
            {currentUser.fiends}
        </div>
    );
}

export default MessageGroups;