import React, { memo, Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import SearchInput from '../FormInput/SearchInput/SearchInput'
import Navigation from '../Navigation/Navigation'
import { useAuth } from "../../context/AuthContext"
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { RiArrowDownSLine } from 'react-icons/ri'
import { MdEventNote } from 'react-icons/md'
import { IoLogInOutline } from 'react-icons/io5';
import './Header.scss';

const Header = () => {
    const { currentUser } = useAuth()
    const history = useHistory()
    const [showDropDown, setShowDropdown] = useState(false)

    return (
        <div className="header">
            {currentUser ? <SearchInput /> : null}
            <div className="navigation">
                {currentUser ? null : <Link to='/login'>
                    <RoundButton icon={<IoLogInOutline />} />
                </Link>}
                {currentUser ? <Fragment>
                    <RoundButton onClick={() => history.push("/test")} icon={<MdEventNote />} />
                    <RoundButton onClick={() => history.push("/")} icon={<BiMessageRoundedDetail />} />
                </Fragment> : null}
                <RoundButton onClick={() => setShowDropdown(!showDropDown)}
                    icon={< RiArrowDownSLine className={showDropDown ? 'spinn' : 'spinn-back'} />} />
                {showDropDown ? <Navigation setShowDropdown={setShowDropdown} /> : null}
            </div>
        </div>
    )
}

export default memo(Header);