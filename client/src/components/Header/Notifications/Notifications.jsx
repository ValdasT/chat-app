import React from 'react';
import { useHistory } from 'react-router-dom';
import UserPhoto from '../../UserPhoto/UserPhoto'
import { updateClickedNotification } from '../../../services/ApiCalls'
import { showTimeFromMS } from '../../../utils/utils'
import './Notifications.scss'

const Notifications = ({ setShowNotifications, allNotifications, setAllNotifications, showModal }) => {
    const history = useHistory()

    const openNotification = async (notification) => {
        try {
            history.push(notification.url)
            setShowNotifications(false)
            if (!notification.clicked) {
                await updateClickedNotification(notification._id)
                setAllNotifications(allNotifications.map(e => e._id === notification._id ?
                    { ...e, clicked: true } : e))
            }
        } catch (error) {
            showModal({ type: 'error', body: error.message, name: error.response.name })
        }
    }

    return (
        <div>
            <div className="close-notifications" onClick={() => setShowNotifications(false)}></div>
            <div className="dropdown-notifications" >
                {allNotifications.length ? allNotifications.map(notification => (
                    <div key={notification._id} className={`dropdown-notifications-element ${!notification.clicked ? 'new-notification-element' : ''}`}
                        onClick={() => openNotification(notification)}>
                        <UserPhoto userInfo={notification.notifier} />
                        <div className='notification-text'>
                            <div>
                                {`${notification.notifier.name} ${notification.notifier.surname ? notification.notifier.surname : ''}`}
                            </div>
                            <div> {notification.notifyAbout}</div>
                            <div className='notification-time'>{showTimeFromMS(notification.createdAt)}</div>
                        </div>
                    </div>
                )) : <div style={{ padding: '5px', textAlign: 'center' }}>{`You don't have any notifications`}</div>}
            </div>
        </div>
    );
}

export default Notifications;