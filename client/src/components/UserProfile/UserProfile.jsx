import React, { useState, memo } from 'react';
import CustomButton from '../CustomButtons/Button/CustomButton'
import { firstLetters } from '../../utils/utils'
import { sendRequest } from '../../services/ApiCalls'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

import './UserProfile.scss'

const UserProfile = ({ userInfo, setUserInfo, currentUser, showModal, userInvites, setUserInvites }) => {

    const [loadingButton, setLoadingButton] = useState(false)

    const sendFriendRequest = async () => {
        try {
            setLoadingButton(true)
            let users = await sendRequest(userInfo, currentUser, 'friend')
            setUserInvites([...userInvites, users.newInvite])
            setUserInfo(users.user)
            setLoadingButton(false)
        } catch (err) {
            setLoadingButton(false)
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    const showButton = (invites) => {
        let status = 'none'
        if (invites && invites.length) {
            let currentInvite = userInvites.find(invite => {
                return invites.some((inviteId) => {
                    return inviteId === invite._id;
                });
            })
            console.log(currentInvite)
            if (currentInvite && currentInvite.invitor === currentUser._id) {
                status = 'cancel'
            } else if (currentInvite && currentInvite.invitee === currentUser._id) {
                status = 'confirm'
            }

            // status = 'confirm'
        }

        switch (status) {
            case 'none':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => sendFriendRequest()} icon={<AiOutlineUsergroupAdd />}>
                        Add friend
                    </CustomButton>
                );
            case 'confirm':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => sendFriendRequest()} icon={<AiOutlineUsergroupAdd />}>
                        Accept Invite
                        </CustomButton>
                );
            case 'cancel':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => sendFriendRequest()} icon={<AiOutlineUsergroupAdd />}>
                        Cancel Invite
                        </CustomButton>
                );
            case 'unfriend':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => sendFriendRequest()} icon={<AiOutlineUsergroupAdd />}>
                        Unfriend
                        </CustomButton>
                );
            default: return null
        }
    }

    return (
        <div>
            <div className='profile-header'>
                <div className='profile-img-back'>
                    <div style={{ background: userInfo.picColor }} className="profile-image">{firstLetters(userInfo)}</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-Name'>{userInfo.name} {userInfo.surname}</div>
                    {userInfo.ownProfile ? null : <div className='friend-actions'>
                        {showButton(userInfo.invites)}
                    </div>}

                </div>
            </div>
        </div>
    );
}

export default memo(UserProfile);