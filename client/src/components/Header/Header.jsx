import React, { memo, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ThemeMode from '../layout/ThemeChanger'
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { useAuth } from "../../context/AuthContext"
import { GiExitDoor } from 'react-icons/gi'
import { IoSettingsOutline, IoLogInOutline } from 'react-icons/io5';
import './Header.scss';

const Header = () => {
    const { currentUser, logOut } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        try {
            await logOut()
            history.push("/login")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="header">
            <div className="navigation">
                <ThemeMode />
                {currentUser ? null : <Link to='/login'>
                    <RoundButton icon={<IoLogInOutline />} />
                </Link>}
                {currentUser ? <Fragment>
                    <RoundButton onClick={() => history.push("/test")} icon={<IoSettingsOutline />} />
                    <RoundButton onClick={handleLogout} icon={<GiExitDoor />} />
                </Fragment> : null}
            </div>
        </div>
    )
}

export default memo(Header);