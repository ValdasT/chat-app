import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import ThemeMode from '../layout/ThemeChanger'
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { GiExitDoor } from 'react-icons/gi'
import { IoSettingsOutline, IoLogInOutline } from 'react-icons/io5';
import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="navigation">
                <ThemeMode />
                <RoundButton icon={<IoSettingsOutline />} />
                <Link to='/login'>
                    <RoundButton icon={<IoLogInOutline />} />
                </Link>
                <RoundButton icon={<GiExitDoor />} />
            </div>
        </div>
    )
}

export default Header;