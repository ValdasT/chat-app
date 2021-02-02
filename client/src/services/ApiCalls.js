import api from '../utils/api';

const createUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    try {
        const res = await api.post('/users/create-user', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getUser = async (user) => {
    const body = JSON.stringify({
        user: user,
    })
    try {
        const res = await api.post('/users/get-user', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
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
        throw err;
    }
};

const getRegions = async () => {
    try {
        const res = await api.post('/system/get-regions');
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getKbs = async () => {
    try {
        const res = await api.post('/system/get-kbs');
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const sendAnswer = async (message, token, currentUser, recommendation) => {
    const body = JSON.stringify({
        question: message.question,
        token: token ? token : null,
        user: `${currentUser['first-name']} ${currentUser['last-name']}`,
        email: currentUser.email,
        channel: 'web_hugo',
        system: 'hugo',
        channelList: currentUser.kbs,
        region: currentUser.region,
        recommendation: recommendation? recommendation: null
    });
    try {
        const res = await api.post('/', body);
        console.log(res.data);
        res.data.id = message.id;
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const voteAnswer = async (answer, vote) => {
    const body = JSON.stringify({
        userQuestionId: answer.message.userQuestionId,
        evaluation: vote,
        answerId: answer.message.answerId,
        topClass: answer.message.top_class,
    });
    try {
        const res = await api.post('/voting', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const exampleQuestionsList = async () => {
    const body = JSON.stringify({
        channel: 'web_hugo',
    });
    try {
        const res = await api.post('/exampleQuestionsList', body);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export {
    createUser,
    getUser,
    sendAnswer,
    updateUser,
    getRegions,
    getKbs,
    voteAnswer,
    exampleQuestionsList
}

