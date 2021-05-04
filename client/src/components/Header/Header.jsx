import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import SearchInput from '../FormInput/SearchInput/SearchInput'
import Navigation from '../Navigation/Navigation'
import ThemeMode from '../layout/ThemeChanger'
import { useAuth } from "../../context/AuthContext"
import { RiArrowDownSLine } from 'react-icons/ri'
import { IoLogInOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import './Header.scss';

const Header = () => {
    const { currentUser } = useAuth()
    const [showDropDown, setShowDropdown] = useState(false)

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
                {currentUser ? <RoundButton onClick={() => setShowDropdown(!showDropDown)}
                    icon={< RiArrowDownSLine className={showDropDown ? 'spinn' : 'spinn-back'} />} /> : null}
                {showDropDown ? <Navigation setShowDropdown={setShowDropdown} /> : null}
            </div>
        </div>
    )
}

export default memo(Header);