const User = require('../models/user');
const logger = require('../utils/logger');
const createUser = async userData => {
    logger.info(`Creating user profile in db... `, userData);
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            logger.info(`User already exists in db... `, userData.email);
            throw new Error('User exists already.');
        }
        const user = new User({
            email: userData.email,
            name: userData.name,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });

        const result = await user.save();
        logger.info(`Creating user profile in db... Done `, userData);
        return { ...result._doc };
    } catch (err) {
        logger.error('Creating user profile in db error: ', err);
        throw err;
    }
}

const getUser = async userEmail => {
    try {
        logger.info(`Get user profile from db...`, userEmail);
        const userProfile = await User.findOne({ email: userEmail });
        logger.info(`Get user profile from db... Done.`, userProfile._doc);
        return userProfile ? { ...userProfile._doc } : 'not found';
    } catch (err) {
        logger.error('Get user profile from db error: ', err);
        throw err;
    }
}

const updateUser = async (args, req) => {
    logger.info(`Update user profile in db... `, args.userId);
    try {
        const user = await User.findByIdAndUpdate(args.userId,
            {
                name: args.name,
                surname: args.surname,
                email: args.email,
                updatedAt: args.updatedAt
            },
            { new: true });
            logger.info(`Update user profile in db... Done. `, user.id);
        return {
            ...user._doc,
            _id: user.id
        }
    } catch (err) {
        logger.error('Update user profile in db error: ', err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}