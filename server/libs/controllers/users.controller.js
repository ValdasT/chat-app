const User = require('../models/user');
const logger = require('../utils/logger');
const moduleName = module.filename.split('/').slice(-1);

const createUser = async userData => {
    logger.info(`[${moduleName}] Creating user profile in db... `, userData);
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            logger.info(`[${moduleName}] User already exists in db... `, userData.email);
            throw new Error('User exists already.');
        }
        const user = new User({
            email: userData.email,
            name: userData.name,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });

        const result = await user.save();
        logger.info(`[${moduleName}] Creating user profile in db... Done `, userData);
        return { ...result._doc };
    } catch (err) {
        logger.error(`[${moduleName}] Creating user profile in db error: `, err);
        throw err;
    }
}

const getUser = async userEmail => {
    try {
        logger.info(`[${moduleName}] Get user profile from db...`, userEmail);
        const userProfile = await User.findOne({ email: userEmail });
        if (userProfile) {
            logger.info(`[${moduleName}] Get user profile from db... Done.`, userProfile._doc);
            return { ...userProfile._doc }
        } else {
            logger.info(`[${moduleName}] Get user profile from db... Done.`);
            return 'not found';
        }
    } catch (err) {
        logger.error(`[${moduleName}] Get user profile from db error: `, err);
        throw err;
    }
}

const updateUser = async (args, req) => {
    logger.info(`[${moduleName}] Update user profile in db... `, args.userId);
    try {
        const user = await User.findByIdAndUpdate(args.userId,
            {
                name: args.name,
                surname: args.surname,
                email: args.email,
                updatedAt: args.updatedAt
            },
            { new: true });
            logger.info(`[${moduleName}] Update user profile in db... Done. `, user.id);
        return {
            ...user._doc,
            _id: user.id
        }
    } catch (err) {
        logger.error(`[${moduleName}] Update user profile in db error: `, err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}