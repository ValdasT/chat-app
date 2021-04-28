import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { AiOutlineUser } from 'react-icons/ai'
import { GiExitDoor } from 'react-icons/gi'
import { MdEventNote } from 'react-icons/md'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import './Navigation.scss'

const Navigation = ({ setShowDropdown }) => {
    const { currentUser, logOut } = useAuth()
    const history = useHistory()
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logOut()
            history.push("/login")
        } catch (err) {
            console.log(err);
        }
    }

    const goToCurrentUserPage = () => {
        if (location.pathname.includes(`/users/`)) {
            if (location.pathname.substr(location.pathname.length - 1) === '/') {
                location.pathname = location.pathname.slice(0, -1)
            }
            location.pathname = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
            history.push(`${location.pathname}/${currentUser._id}`)
        } else {
            history.push(`/users/${currentUser._id}`)
        }
    }
    return (
        <div>
            <div className="close-navigation" onClick={() => setShowDropdown(false)}></div>
            <div className="dropdown-navigation" >
                {currentUser ?
                    <div>
                        <div className='dropdown-navigation-element' onClick={() => history.push("/test")}>
                            <RoundButton icon={<MdEventNote />} text={'Just Page'} />
                        </div>
                        <div className='dropdown-navigation-element' onClick={() => history.push("/")}>
                            <RoundButton onClick={() => history.push("/")} icon={<BiMessageRoundedDetail />} text={'Messages'} />
                        </div>
                        <div className='dropdown-navigation-element' onClick={() => goToCurrentUserPage()}>
                            <RoundButton icon={<AiOutlineUser />} text={'User profile / settings'} />
                        </div>
                        <div className='dropdown-navigation-element' onClick={handleLogout}>
                            <RoundButton onClick={handleLogout} icon={<GiExitDoor />} text={'Log out'} />
                        </div>
                    </div> : null
                }
            </div>
        </div>
    );
}

export default Navigation;