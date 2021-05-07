import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import SearchInput from '../FormInput/SearchInput/SearchInput'
import Navigation from './Navigation/Navigation'
import Notifications from './Notifications/Notifications'
import ThemeMode from '../layout/ThemeChanger'
import { useAuth } from "../../context/AuthContext"
import { RiArrowDownSLine } from 'react-icons/ri'
import { IoLogInOutline, IoChatbubbleEllipsesOutline, IoNotificationsOutline } from 'react-icons/io5';
import useSockets from "../UseSockets/UseSockets";
import './Header.scss';

const Header = () => {
    const { currentUser, allNotifications, setAllNotifications } = useAuth()
    const [showDropDown, setShowDropdown] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const { notificationFromSocket } = useSockets();

    useEffect(() => {
        if (notificationFromSocket.notification) {
            setAllNotifications(allNotifications => [...allNotifications, notificationFromSocket.notification])
        }
    }, [notificationFromSocket])

    return (
        <div className="header">
            <div className='logo'>
                <div className='logo-text'>Let's go!</div>
                <IoChatbubbleEllipsesOutline className='logo-icon' />
            </div>
            {currentUser ? <SearchInput /> : null}
            <div className="navigation">
                <div className='dropdown-navigation-element'>
                    <ThemeMode />
                </div>
                {currentUser ? null : <Link to='/login'>
                    <RoundButton icon={<IoLogInOutline />} />
                </Link>}
                {currentUser ? <div><RoundButton onClick={() => setShowNotifications(!showDropDown)}
                    icon={< IoNotificationsOutline className='bell' />} />
                    {allNotifications.length ? <div onClick={() => setShowNotifications(!showDropDown)}
                        className='new-notifications'>{allNotifications.length}</div> : null} </div> : null}
                {showNotifications ? <Notifications allNotifications={allNotifications} setShowNotifications={setShowNotifications} /> : null}
                {currentUser ? <RoundButton onClick={() => setShowDropdown(!showDropDown)}
                    icon={< RiArrowDownSLine className={showDropDown ? 'spinn' : 'spinn-back'} />} /> : null}
                {showDropDown ? <Navigation setShowDropdown={setShowDropdown} /> : null}
            </div>
        </div>
    )
}

export default memo(Header);