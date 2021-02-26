import React, { useEffect } from 'react';
import './UserProfile.scss'
import CustomButton from '../CustomButtons/Button/CustomButton'
import { sendRequest } from '../../services/ApiCalls'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

const UserProfile = ({ userInfo, setUserInfo, currentUser, showModal, userInvites }) => {

    const firstLetters = (userInfo) => {
        let credentials = userInfo.name.charAt(0).toUpperCase();
        credentials += userInfo.surname ? userInfo.surname.charAt(0).toUpperCase() : ''
        return credentials
    }

    const sendFriendRequest = async () => {
        try {
            let user = await sendRequest(userInfo, currentUser, 'friend')
            setUserInfo(user)
        } catch (err) {
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    useEffect(() => {
        if (userInvites.length && currentUser.invites.length) {
            currentUser.invites.forEach(e => {
                let invite = userInvites.find(invite => invite._id === e)
                console.log(invite)
            })
        }
    }, [userInfo, currentUser, userInvites])

    return (
        <div>
            <div className='profile-header'>
                <div className='profile-img-back'>
                    <div style={{ background: userInfo.picColor }} className="profile-image">{firstLetters(userInfo)}</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-Name'>{userInfo.name} {userInfo.surname}</div>
                    {userInfo.ownProfile ? null : <div className='friend-actions'>
                        <CustomButton onClick={() => sendFriendRequest()} icon={<AiOutlineUsergroupAdd />}>Add friend </CustomButton>
                    </div>}

                </div>
            </div>
        </div>
    );
}

export default UserProfile;