const express = require('express');
const router = express.Router();
const logger = require('../libs/utils/logger')
const moduleName = module.filename.split('/').slice(-1);
const { decodeSession } = require('../libs/utils/utils')
const userController = require('../libs/controllers/users.controller')

router.post('/create-user', async (req, res, next) => {
    const data = req.body.user;
    try {
        let user = await userController.createUser(data)
        if (user) res.status(200).send(user);
    } catch (err) {
        logger.error(`[${moduleName}] Create user error: `, err);
        return next(err);
    }
});

router.post('/get-user', async (req, res, next) => {
    const data = req.body.user;
    try {
        const userEmail = req.userEmail
        logger.info(`[${moduleName}] Get user info ${userEmail}...`);
        let userById = await userController.getUserById(data)
        let userFromSession = {}
        if (data !== userEmail) {
            userFromSession = await userController.getUser(userEmail)
        }
        if (userById !== 'not found' && userFromSession !== 'not found') {
            if (userById._id.toString() === userFromSession._id.toString()) {
                userById.ownProfile = true
            }
            logger.info(`[${moduleName}] User was found in db. ${data}`);
            res.status(200).send(userById)
        } else {
            logger.info(`[${moduleName}] User not found. ${data}`);
            return next(new Error('User not found.'))
        };
    } catch (err) {
        logger.error(`[${moduleName}] Get user info error: `, err);
        return next(err);
    }
});

router.get('/get-notifications/:user', async (req, res, next) => {
    const { user } = req.params
    try {
        logger.info(`[${moduleName}] Get users notifications ${user}...`);
        let notifications = await userController.getAllNotifications(user)
        logger.info(`[${moduleName}] Get users notifications ${user}... Done`);
        res.status(200).send(notifications)

    } catch (err) {
        logger.error(`[${moduleName}] Get users notifications ${user}...: `, err);
        return next(err);
    }
});

router.get('/get-user-for-init', async (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    let decodedClaims = await decodeSession(sessionCookie)
    const userEmail = decodedClaims.email
    logger.info(`[${moduleName}] Get user info... ${userEmail}`);
    try {
        let user = await userController.getUser(userEmail)
        if (user !== 'not found') {
            logger.info(`[${moduleName}] User was found in db. ${userEmail}`);
            res.status(200).send(user)
        } else {
            logger.info(`[${moduleName}] User not found. ${userEmail}`);
            user = await userController.createUser(decodedClaims)
            res.status(200).send(user)
        };
    } catch (err) {
        logger.error(`[${moduleName}] Get user info error: `, err);
        return next(err);
    }
});

router.post('/search-users', async (req, res, next) => {
    const data = req.body.user;
    try {
        logger.info(`[${moduleName}] Search user... ${data}`);
        let user = await userController.searchUsers(data)
        logger.info(`[${moduleName}] Search user... Done.`);
        if (user) res.status(200).send(user);
    } catch (err) {
        logger.error(`[${moduleName}] Search user error: `, err);
        return next(err);
    }
});

router.post('/get-friends', async (req, res, next) => {
    const data = {
        user: req.body.user
    }
    try {
        logger.info(`[${moduleName}] Get all friends...`);
        let users = await userController.getAllFriends(data)
        logger.info(`[${moduleName}] Get all friends... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Get all friends Error: `, err);
        return next(err);
    }
});

router.post('/get-chats', async (req, res, next) => {
    const data = {
        user: req.body.user
    }
    try {
        logger.info(`[${moduleName}] Get all chats...`);
        let users = await userController.getAllChatsInfo(data)
        logger.info(`[${moduleName}] Get all chats... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Get all chats Error: `, err);
        return next(err);
    }
});

router.post('/get-messages', async (req, res, next) => {
    const data = {
        chatId: req.body.chatId,
    }
    try {
        logger.info(`[${moduleName}] Get messages...`);
        let users = await userController.getAllMessages(data)
        logger.info(`[${moduleName}] Get messages... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Get messages Error: `, err);
        return next(err);
    }
});

router.post('/save-message', async (req, res, next) => {
    const data = {
        message: req.body.message,
        messageDoc: req.body.messageDoc
    }
    try {
        logger.info(`[${moduleName}] Save messages...`);
        let users = await userController.saveMessage(data)
        logger.info(`[${moduleName}] Save messages... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Save messages Error: `, err);
        return next(err);
    }
});

router.post('/get-all-invites', async (req, res, next) => {
    const data = req.body.user;
    try {
        logger.info(`[${moduleName}] Get all invite docs... ${data}`);
        let user = await userController.getUserById(data)
        let invites = await userController.getAllInvites(user.invites)
        logger.info(`[${moduleName}] Get all invite docs... Done.`);
        if (invites) res.status(200).send(invites);
    } catch (err) {
        logger.error(`[${moduleName}] Get all invite docs error: `, err);
        return next(err);
    }
});

router.post('/send-friend-request', async (req, res, next) => {
    const data = {
        userData: req.body.friend,
        currentUser: req.body.user,
        type: req.body.type,
        invitedTo: req.body.invitedTo ? req.body.invitedTo : req.body.user
    }
    try {
        logger.info(`[${moduleName}] Create request friend...`);
        let users = await userController.createRequest(data)
        logger.info(`[${moduleName}] Create request... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Create request Error: `, err);
        return next(err);
    }
});

router.post('/accept-friend-request', async (req, res, next) => {
    const data = {
        friendDoc: req.body.friend,
        currentUser: req.body.user,
    }
    try {
        logger.info(`[${moduleName}] Accept request...`);
        let users = await userController.acceptRequest(data)
        logger.info(`[${moduleName}] Accept request... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Accept request Error: `, err);
        return next(err);
    }
});

router.post('/cancel-friend-request', async (req, res, next) => {
    const data = {
        friendDoc: req.body.friend,
        currentUser: req.body.user,
    }
    try {
        logger.info(`[${moduleName}] Cancel request...`);
        let users = await userController.cancelRequest(data)
        logger.info(`[${moduleName}] Cancel request... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Cancel request Error: `, err);
        return next(err);
    }
});

router.post('/unfriend', async (req, res, next) => {
    const data = {
        friendDoc: req.body.friend,
        currentUser: req.body.user,
    }
    try {
        logger.info(`[${moduleName}] Unfriend...`);
        let users = await userController.unfriendFriend(data)
        logger.info(`[${moduleName}] Unfriend... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Unfriend Error: `, err);
        return next(err);
    }
});

router.post('/get-button-status', async (req, res, next) => {
    const data = {
        friendDoc: req.body.friend,
        currentUser: req.body.user,
    }
    try {
        logger.info(`[${moduleName}] Get button status...`);
        let users = await userController.getButtonStatus(data)
        logger.info(`[${moduleName}] Get button status... Done.`);
        if (users) res.status(200).send(users);
    } catch (err) {
        logger.error(`[${moduleName}] Get button status Error: `, err);
        return next(err);
    }
});

module.exports = router;