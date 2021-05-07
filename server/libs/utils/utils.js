const admin = require("firebase-admin");
const logger = require('../utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const NOTIFICATIONS_ABOUT = {
    sendFriendRequest: 'Send a friend request',
    acceptedFriendRequest: 'Accepted your friend request',
}

const colors = [
    "#11b8b8",
    "#0000ff",
    "#a52a2a",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#d9b700",
    "#008000",
    "#4b0082",
    "#4e8ea3",
    "#0f8585",
    "#2aad2a",
    "#919090",
    "#057505",
    "#800000",
    "#000080",
    "#808000",
    "#bd7a00",
    "#ba8891",
    "#800080",
    "#bd4242",
    "#616161",
    "#a3a300"
];
const getRandomCollor = () => {
    const random = Math.floor(Math.random() * colors.length);
    console.log(random, colors[random]);
    return colors[random]
}

const decodeSession = (session) => {
    return new Promise((resolve, reject) => {
        logger.info(`[${moduleName}] Decoding session...`);
        admin
            .auth()
            .verifySessionCookie(session, true /** checkRevoked */)
            .then((decodedClaims) => {
                logger.info(`[${moduleName}] Decoding session... Done.`);
                resolve(decodedClaims)
            }).catch((err) => {
                logger.error(`[${moduleName}] Decoding session error: `, err);
                reject(err)
            });
    })
}

module.exports = {
    getRandomCollor,
    decodeSession,
    NOTIFICATIONS_ABOUT
}