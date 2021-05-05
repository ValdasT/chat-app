import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext"
import RoundButton from '../../CustomButtons/RoundButton/Roundbutton'
import { AiOutlineUser } from 'react-icons/ai'
import { GiExitDoor } from 'react-icons/gi'
import { MdEventNote } from 'react-icons/md'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import './Notifications.scss'

const Notifications = ({ setShowNotifications }) => {
    const { currentUser } = useAuth()
    const history = useHistory()
    const location = useLocation();


    return (
        <div>
            <div className="close-notifications" onClick={() => setShowNotifications(false)}></div>
            <div className="dropdown-notifications" >
                {currentUser ?
                    <div>
                        <div className='dropdown-notifications-element' onClick={() => history.push("/test")}>
                            <RoundButton icon={<MdEventNote />} text={'Just Page'} />
                        </div>
                        <div className='dropdown-notifications-element' onClick={() => history.push("/")}>
                            <RoundButton onClick={() => history.push("/")} icon={<BiMessageRoundedDetail />} text={'Messages'} />
                        </div>
                    </div> : null
                }
            </div>
        </div>
    );
}

export default Notifications;