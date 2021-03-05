import React, { Fragment, memo, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile'
import { getUser } from '../services/ApiCalls'
import { GlobalContext } from '../context/GlobalState';
import { useAuth } from "../context/AuthContext"

const UserPage = () => {

    let { userId } = useParams();
    const [userInfo, setUserInfo] = useState()
    const { showModal, showSpinner } = useContext(GlobalContext);
    const { currentUser } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                showSpinner(true)
                let user = await getUser(userId)
                setUserInfo(user)
                showSpinner(false)
            } catch (error) {
                showSpinner(false)
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    return (
        <Fragment>
            {userInfo ?
                <UserProfile
                    userInfo={userInfo} setUserInfo={setUserInfo} currentUser={currentUser} showModal={showModal} /> : null}
        </Fragment>
    )
}

export default memo(UserPage);