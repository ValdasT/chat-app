const admin = require("firebase-admin");
var logger = require('../libs/utils/logger');

const isAuth = (req, res, next) => {
    logger.info(` ${module.filename.split('/').slice(-1)} Checking authorization...`);
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then(() => {
            logger.info(`Checking authorization... Done`);
            return next();
        })
        .catch((error) => {
            logger.error('Checking authorization error: ', error);
            res.status(401).send("UNAUTHORIZED REQUEST!");
        });
};

const createSession = (req, res) => {
    logger.info(`Creating session...`);
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 1 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie("session", sessionCookie, options);
                logger.info(`Creating session... Done`);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                logger.error('Creating session error: ', error);
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
}

const logOut = (req, res) => {
    logger.info(`Loging out...`);
    res.clearCookie('session');
    logger.info(`Loging out... Done`);
    res.end(JSON.stringify({ status: "success" }));
}

module.exports = {
    isAuth,
    createSession,
    logOut
}