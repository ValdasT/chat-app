import api from '../utils/api';
import { handleError } from './ErrorHandler'

const performCall = async (method, url, body) => {
    try {
        if (method === 'GET') {
            const res = await api.get(url);
            return res.data;
        } else {
            const res = await api.post(url, body);
            return res.data;
        }
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
}

const createUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    return await performCall('POST', '/users/create-user', body)
};

const createSession = async (idToken) => {
    const body = JSON.stringify({ idToken })
    return await performCall('POST', '/create-session', body)
};

const logOutUser = async () => {
    return await performCall('GET', '/log-out')
};

const getToken = async () => {
    return await performCall('GET', '/get-token')
};

const getUserForInint = async () => {
    return await performCall('GET', '/users/get-user-for-init')
};

const getUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    return await performCall('POST', '/users/get-user', body)
};

const getAllNotifications = async (user) => {
    return await performCall('GET', `/users/get-notifications/${user._id}`)
};

const updateSeenNotifications = async (notifications) => {
    const body = JSON.stringify({
        notifications: notifications,
    })
    return await performCall('POST', `/users/update-seen-notifications`, body)
};

const getFriends = async (user) => {
    const body = JSON.stringify({
        user: user
    })
    return await performCall('POST', '/users/get-friends', body)
};

const getChats = async (user) => {
    const body = JSON.stringify({
        user: user
    })
    return await performCall('POST', '/users/get-chats', body)
};

const getMessages = async (chatId) => {
    const body = JSON.stringify({
        chatId
    })
    return await performCall('POST', '/users/get-messages', body)
};

const saveMessage = async (message, messageDoc) => {
    const body = JSON.stringify({
        message: message,
        messageDoc: messageDoc
    })
    return await performCall('POST', '/users/save-message', body)
};

const updateUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    return await performCall('POST', '/users/update-user', body)
};

const searchUsers = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    return await performCall('POST', '/users/search-users', body)
};

const getAllInvites = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    return await performCall('POST', '/users/get-all-invites', body)
};

const sendRequest = async (friend, user, type, invitedTo) => {
    const body = JSON.stringify({
        friend: friend,
        user: user,
        type: type,
        invitedTo: invitedTo
    })
    return await performCall('POST', '/users/send-friend-request', body)
};

const acceptRequest = async (friend, user) => {
    const body = JSON.stringify({
        friend: friend,
        user: user
    })
    return await performCall('POST', '/users/accept-friend-request', body)
};

const cancelRequest = async (friend, user) => {
    const body = JSON.stringify({
        friend: friend,
        user: user
    })
    return await performCall('POST', '/users/cancel-friend-request', body)
};

const getButtonStatus = async (friend, user) => {
    const body = JSON.stringify({
        friend: friend,
        user: user
    })
    return await performCall('POST', '/users/get-button-status', body)
};

const unfriend = async (friend, user) => {
    const body = JSON.stringify({
        friend: friend,
        user: user
    })
    return await performCall('POST', '/users/unfriend', body)
};

export {
    getToken,
    createUser,
    logOutUser,
    createSession,
    getUserForInint,
    getMessages,
    saveMessage,
    updateUser,
    getUser,
    getFriends,
    getChats,
    searchUsers,
    sendRequest,
    acceptRequest,
    cancelRequest,
    getAllInvites,
    getButtonStatus,
    unfriend,
    getAllNotifications,
    updateSeenNotifications
}

