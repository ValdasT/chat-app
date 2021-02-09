const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const logger = require('../libs/utils/logger')
const moduleName = module.filename.split('/').slice(-1);
const { createUser, getUser } = require('../libs/controllers/users.controller')

router.post('/create-user', async (req, res, next) => {
    const userData = req.body.user;
    try {
        let user = await createUser(userData)
        if (user) res.status(200).send(user);
    } catch (err) {
        if (err) return next(err);
    }
});

router.post('/get-user', async (req, res, next) => {
    const userData = req.body.user;
    try {
        let user = await getUser(userData)
        if (user) res.status(200).send(user);
    } catch (err) {
        if (err) return next(err);
    }
});

router.post('/get-user-for-init', async (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(async (decodedClaims) => {
        const userEmail = decodedClaims.email
        try {
            let user = await getUser(userEmail)
            if (user !== 'not found') {
                logger.info(`[${moduleName}] User was found in db.`, userEmail);
                res.status(200).send(user)
            } else {
                logger.info(`[${moduleName}] User not found.`, userEmail);
                user = await createUser(decodedClaims)
                res.status(200).send(user)
            };
        } catch (err) {
            if (err) return next(err);
        }
        return next();
    })
    .catch((error) => {
        logger.error(`[${moduleName}] Get user for init error: `, error);
        res.redirect("/login");
    });
});




module.exports = router;