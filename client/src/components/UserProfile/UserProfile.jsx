import React from 'react';
import './UserProfile.scss'
const UserProfile = ({ userInfo }) => {

    const firstLetters = (userInfo) => {
        let credentials = userInfo.name.charAt(0).toUpperCase();
        credentials += userInfo.surname ? userInfo.surname.charAt(0).toUpperCase() : ''
        return credentials
    }

    return (
        <div>
            <div className='profile-header'>
                <div className='profile-img-back'>
                    <div style={{ background: userInfo.picColor }} className="profile-image">{firstLetters(userInfo)}</div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;