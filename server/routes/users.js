const express = require('express');
const router = express.Router();
const logger = require('../libs/utils/logger')
const moduleName = module.filename.split('/').slice(-1);
const { decodeSession } = require('../libs/utils/utils')
const { createUser, getUser, searchUsers, getUserById } = require('../libs/controllers/users.controller')

router.post('/create-user', async (req, res, next) => {
    const userData = req.body.user;
    try {
        let user = await createUser(userData)
        if (user) res.status(200).send(user);
    } catch (err) {
        logger.error(`[${moduleName}] Create user error: `, err);
        return next(err);
    }
});

router.post('/get-user', async (req, res, next) => {
    const userData = req.body.user;
    const sessionCookie = req.cookies.session || "";
    try {
        let decodedClaims = await decodeSession(sessionCookie)
        const userEmail = decodedClaims.email
        logger.info(`[${moduleName}] Get user info ${userEmail}...`);
        let userById = await getUserById(userData)
        let userFromSession = {}
        if (userData !== userEmail) {
            userFromSession = await getUser(userEmail)
        }
        if (userById !== 'not found' && userFromSession !== 'not found') {
            if (userById._id.toString() === userFromSession._id.toString()) {
                userById.ownProfile = true
            }
            logger.info(`[${moduleName}] User was found in db. ${userData}`);
            res.status(200).send(userById)
        } else {
            logger.info(`[${moduleName}] User not found. ${userData}`);
            return next(new Error('User not found.'))
        };
    } catch (err) {
        logger.error(`[${moduleName}] Get user info error: `, err);
        return next(err);
    }
});

router.post('/get-user-for-init', async (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    let decodedClaims = await decodeSession(sessionCookie)
    const userEmail = decodedClaims.email
    logger.info(`[${moduleName}] Get user info... ${userEmail}`);
    try {
        let user = await getUser(userEmail)
        if (user !== 'not found') {
            logger.info(`[${moduleName}] User was found in db. ${userEmail}`);
            res.status(200).send(user)
        } else {
            logger.info(`[${moduleName}] User not found. ${userEmail}`);
            user = await createUser(decodedClaims)
            res.status(200).send(user)
        };
    } catch (err) {
        logger.error(`[${moduleName}] Get user info error: `, err);
        return next(err);
    }
});

router.post('/search-users', async (req, res, next) => {
    const userData = req.body.user;
    try {
        logger.info(`[${moduleName}] Search user... ${userData}`);
        let user = await searchUsers(userData)
        logger.info(`[${moduleName}] Search user... Done.`);
        if (user) res.status(200).send(user);
    } catch (err) {
        logger.error(`[${moduleName}] Search user error: `, err);
        return next(err);
    }
});

module.exports = router;