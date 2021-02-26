const admin = require("firebase-admin");
const logger = require('../libs/utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const isAuth = (req, res, next) => {
    logger.info(`[${moduleName}] Checking authorization...`);
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            req.userEmail = decodedClaims.email
            logger.info(`[${moduleName}] Checking authorization... Done`);
            return next();
        })
        .catch((error) => {
            logger.error(`[${moduleName}] Checking authorization error: `, error);
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
                logger.info(`[${moduleName}] Creating session... Done`);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                logger.error(`[${moduleName}] Creating session error: `, error);
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
}

const logOut = (req, res) => {
    logger.info(`[${moduleName}] Loging out...`);
    res.clearCookie('session');
    logger.info(`[${moduleName}] Loging out... Done`);
    res.end(JSON.stringify({ status: "success" }));
}

module.exports = {
    isAuth,
    createSession,
    logOut
}