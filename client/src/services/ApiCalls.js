import api from '../utils/api';
import { handleError } from './ErrorHandler'

const createUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    try {
        const res = await api.post('/users/create-user', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const createSession = async (idToken) => {
    const body = JSON.stringify({ idToken })
    try {
        const res = await api.post('/create-session', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const logOutUser = async () => {
    try {
        const res = await api.post('/log-out');
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const getToken = async () => {
    try {
        console.log('get token');
        const res = await api.get('/get-token');
        console.log(res);
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const getUserForInint = async () => {
    try {
        const res = await api.post('/users/get-user-for-init');
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const updateUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    try {
        const res = await api.post('/users/update-user', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw handleError(err);
    }
};

const searchUsers = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    try {
        const res = await api.post('/users/search-users', body);
        return res.data;
    } catch (err) {
        throw handleError(err);
    }
};

export {
    getToken,
    createUser,
    logOutUser,
    createSession,
    getUserForInint,
    updateUser,
    searchUsers
}

