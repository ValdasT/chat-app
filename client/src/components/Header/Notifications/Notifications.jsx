import React from 'react';
import { useHistory } from 'react-router-dom';
import UserPhoto from '../../UserPhoto/UserPhoto'
import { showTimeFromMS } from '../../../utils/utils'
import './Notifications.scss'

const Notifications = ({ setShowNotifications, allNotifications }) => {
    const history = useHistory()


    return (
        <div>
            <div className="close-notifications" onClick={() => setShowNotifications(false)}></div>
            <div className="dropdown-notifications" >
                {allNotifications.length ? allNotifications.map(notification => (
                    <div key={notification._id} className={`dropdown-notifications-element ${!notification.clicked ? 'new-notification-element' : ''}`}
                        onClick={() => history.push(notification.url)}>
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