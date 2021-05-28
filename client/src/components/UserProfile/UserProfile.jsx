import React, { useState, useEffect, memo } from 'react';
import CustomButton from '../CustomButtons/Button/CustomButton'
import { firstLetters } from '../../utils/utils'
import { sendRequest, acceptRequest, cancelRequest, unfriend, getButtonStatus } from '../../services/ApiCalls'
import { AiOutlineUsergroupAdd, AiOutlineUsergroupDelete, AiOutlineUserAdd } from 'react-icons/ai'
import useSockets from "../UseSockets/UseSockets";

import './UserProfile.scss'

const UserProfile = ({ userInfo, setUserInfo, currentUser, showModal }) => {
    const [loadingButton, setLoadingButton] = useState(false)
    const [buttonStatus, setButtonStatus] = useState('none')

    const { sendNotification, enterNewChat } = useSockets();

    const sendFriendRequest = async () => {
        try {
            setLoadingButton(true)
            let res = await sendRequest(userInfo, currentUser, 'friend')
            sendNotification(currentUser, res.notification)
            setButtonStatus(res.buttonStatus)
            setLoadingButton(false)
        } catch (err) {
            setLoadingButton(false)
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    const acceptFriendRequest = async () => {
        try {
            setLoadingButton(true)
            let res = await acceptRequest(userInfo, currentUser)
            setUserInfo(res.user)
            if (Object.keys(res.newChat).length !== 0) {
                enterNewChat(currentUser._id, [res.newChat._id])
                sendNotification(currentUser, res.notification, res.newChat)
            } else {
                sendNotification(currentUser, res.notification)
            }
            setButtonStatus(res.buttonStatus)
            setLoadingButton(false)
        } catch (err) {
            setLoadingButton(false)
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    const cancelFriendRequest = async () => {
        try {
            setLoadingButton(true)
            let res = await cancelRequest(userInfo, currentUser)
            setButtonStatus(res.buttonStatus)
            setLoadingButton(false)
        } catch (err) {
            setLoadingButton(false)
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    const unfriendFriend = async () => {
        try {
            setLoadingButton(true)
            let res = await unfriend(userInfo, currentUser)
            setButtonStatus(res.buttonStatus)
            setLoadingButton(false)
        } catch (err) {
            setLoadingButton(false)
            showModal({ type: 'error', body: err.message, name: err.response.name })
        }
    }

    const showButton = () => {
        switch (buttonStatus) {
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
                        onClick={() => acceptFriendRequest()} icon={<AiOutlineUserAdd />}>
                        Accept Invite
                            </CustomButton>
                );
            case 'cancel':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => cancelFriendRequest()} icon={<AiOutlineUsergroupDelete />}>
                        Cancel Invite
                            </CustomButton>
                );
            case 'unfriend':
                return (
                    <CustomButton disabled={loadingButton} buttonSpinner={loadingButton}
                        onClick={() => unfriendFriend()} icon={<AiOutlineUsergroupDelete />}>
                        Unfriend
                            </CustomButton>
                );
            default: return null
        }
    }


    useEffect(() => {
        (async () => {
            try {
                setLoadingButton(true)
                let buttonStatus = await getButtonStatus(userInfo, currentUser)
                setButtonStatus(buttonStatus)
                setLoadingButton(false)
            } catch (error) {
                setLoadingButton(false)
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return (
        <div>
            <div className='profile-header'>
                <div className='profile-img-back'>
                    <div style={{ background: userInfo.picColor }} className="profile-image">{firstLetters(userInfo)}</div>
                </div>
                <div className='profile-info'>
                    <div className='profile-Name'>{userInfo.name} {userInfo.surname}</div>
                    {userInfo.ownProfile ? null : <div className='friend-actions'>
                        {showButton()}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default memo(UserProfile);