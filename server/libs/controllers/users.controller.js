const User = require('../models/user');
const Invite = require('../models/invite')
const Friend = require('../models/friend')
const Chat = require('../models/chat')
const Message = require('../models/message')
const logger = require('../utils/logger');
const moduleName = module.filename.split('/').slice(-1);
const { getRandomCollor } = require('../utils/utils')

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
            picColor: getRandomCollor()
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

const getUserById = async userId => {
    try {
        logger.info(`[${moduleName}] Get user profile from db by ID... ${userId}`);
        const userProfile = await User.findOne({ _id: userId });
        if (userProfile) {
            logger.info(`[${moduleName}] Get user profile from db by ID... Done. ${userProfile._doc}`);
            return { ...userProfile._doc }
        } else {
            logger.info(`[${moduleName}] Get user profile from db by ID... Done.`);
            return 'not found';
        }
    } catch (err) {
        logger.error(`[${moduleName}] Get user profile from db by ID error: `, err);
        throw err;
    }
}

const getAllInvites = async (invites) => {
    try {
        logger.info(`[${moduleName}] Get all invites...`);
        let invitesDocs = []
        if (invites.length) {
            invitesDocs = await Invite.find().where('_id').in(invites).exec();
            logger.info(`[${moduleName}] Get all invites...Done. Found:${invitesDocs.length}`);
        }
        return invitesDocs
    } catch (err) {
        logger.error(`[${moduleName}] Get all invites error: `, err);
        throw err;
    }
}

const getAllFriends = async (args) => {
    const { user } = args
    try {
        logger.info(`[${moduleName}] Get all friends...`);
        let res = []
        const userDoc = await User.findById(user);
        if (userDoc.friends.length) {
            let friendsDocs = await Friend.find().where('_id').in(userDoc.friends).exec()
            logger.info(`[${moduleName}] Get all friends...Done. Found:${friendsDocs.length}`);
            let userProfileIds = friendsDocs.map(e => {
                if (e.friend.toString() === user) {
                    return e.creator
                } else {
                    return e.friend
                }
            })
            res = await User.find().where('_id').in(userProfileIds).select({
                "name": 1, "email": 1, "surname": 1, "_id": 1, "picColor": 1
            });
        }
        return res
    } catch (err) {
        logger.error(`[${moduleName}] Get all friends error: `, err);
        throw err;
    }
}

const getAllMessages = async (args) => {
    const { friend, user } = args
    try {
        logger.info(`[${moduleName}] Get messages...`);
        const friendDoc = await User.findById(friend._id);
        const userDoc = await User.findById(user._id);

        if (!friendDoc || !userDoc) {
            throw new Error('User not found.');
        }
        let currentChat;
        if (userDoc.messages.length && friendDoc.messages.length) {
            userDoc.messages.forEach(e => {
                friendDoc.messages.forEach(el => {
                    if (el.toString() === e.toString()) {
                        currentChat = e
                    }
                })
            })
        }
        if (!currentChat) {
            logger.info(`[${moduleName}] Create and return new chat doc`);
            const chat = new Chat({
                createdAt: new Date().getTime(),
            });

            await chat.save();
            friendDoc.messages.push(chat);
            userDoc.messages.push(chat);
            await friendDoc.save()
            await userDoc.save()
            return { messages: [] }
        } else {
            logger.info(`[${moduleName}] Return old chat doc`);
            const chatMessages = await Chat.findById(currentChat).populate('messages');
            return chatMessages
        }
    } catch (err) {
        logger.error(`[${moduleName}] Get all messages error: `, err);
        throw err;
    }
}

const saveMessage = async (args) => {
    const { message, messageDoc } = args
    try {
        logger.info(`[${moduleName}] Saving message...`);
        const newMessage = new Message({
            message: message.message,
            creator: message.creator,
            createdAt: message.createdAt,
        });

        const chatDoc = await Chat.findById(messageDoc._id);

        if (!chatDoc) {
            throw new Error('Chat doc not found.');
        }

        chatDoc.messages.push(newMessage)
        await newMessage.save();
        await chatDoc.save();
        logger.info(`[${moduleName}] Saving message... Done`);
        return chatDoc

    } catch (err) {
        logger.error(`[${moduleName}] Saving message error: `, err);
        throw err;
    }
}

const updateUser = async (args) => {
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

const searchUsers = async (args) => {
    logger.info(`[${moduleName}] Search users profile in db... ${args}`);
    try {
        const userProfiles = await User.find({ $text: { $search: args } }).limit(10).select({
            "name": 1, "email": 1, "surname": 1, "_id": 1, "picColor": 1
        });
        logger.info(`[${moduleName}]  Search users profile in db... Done. ${userProfiles.length}`);
        return {
            userProfiles
        }
    } catch (err) {
        logger.error(`[${moduleName}] Update user profile in db error: `, err);
        throw err;
    }
}

const createRequest = async args => {
    const { userData, currentUser, type, invitedTo } = args
    logger.info(`[${moduleName}] Create invite in db... ${type}`);
    const invite = new Invite({
        invitor: currentUser._id,
        invitee: userData._id,
        invitedTo: invitedTo,
        createdAt: new Date().getTime(),
        type: type
    });
    try {
        await invite.save();
        logger.info(`[${moduleName}] Create invite in db... Done. ${type}`);
        const creator = await User.findById(currentUser._id);
        let user = await User.findById(userData._id);

        if (!creator || !user) {
            throw new Error('User not found.');
        }
        creator.invites.push(invite);
        user.invites.push(invite);
        await creator.save()
        user = await user.save()
        let response = {
            user: user,
            buttonStatus: await getButtonStatus({ friendDoc: userData, currentUser: currentUser })
        }
        return response;
    } catch (err) {
        logger.error(`[${moduleName}] Update user profile in db error: `, err);
        throw err;
    }
}

const acceptRequest = async data => {
    const { friendDoc, currentUser } = data
    logger.info(`[${moduleName}] Create new friend in db... `);
    const friend = new Friend({
        friend: friendDoc._id,
        creator: currentUser._id,
        type: 'actyve',
        connectedAt: new Date().getTime(),
    });

    try {
        await friend.save();
        let creator = await User.findById(currentUser._id);
        let user = await User.findById(friendDoc._id);
        if (!creator || !user) {
            throw new Error('User not found.');
        }
        let currentInvite
        user.invites.forEach(e => {
            creator.invites.forEach(el => {
                if (e.toString() === el.toString()) {
                    currentInvite = e
                }
            })
        })
        await Invite.deleteOne({ _id: currentInvite._id });
        creator.friends.push(friend);
        user.friends.push(friend);
        creator.invites.pull(currentInvite._id);
        user.invites.pull(currentInvite._id);
        await creator.save()
        user = await user.save()
        let response = {
            user: user,
            buttonStatus: await getButtonStatus({ friendDoc: friendDoc, currentUser: currentUser })
        }
        return response;
    } catch (err) {
        logger.error(`[${moduleName}] Update user profile in db error: `, err);
        throw err;
    }
}

const cancelRequest = async data => {
    const { friendDoc, currentUser } = data
    logger.info(`[${moduleName}] Cancel invite... `);
    try {
        let creator = await User.findById(currentUser._id);
        let user = await User.findById(friendDoc._id);
        if (!creator || !user) {
            throw new Error('User not found.');
        }
        let currentInvite
        user.invites.forEach(e => {
            creator.invites.forEach(el => {
                if (e.toString() === el.toString()) {
                    currentInvite = e
                }
            })
        })
        await Invite.deleteOne({ _id: currentInvite._id });
        creator.invites.pull(currentInvite._id);
        user.invites.pull(currentInvite._id);
        await creator.save()
        user = await user.save()
        let response = {
            user: user,
            buttonStatus: await getButtonStatus({ friendDoc: friendDoc, currentUser: currentUser })
        }
        return response;
    } catch (err) {
        logger.error(`[${moduleName}] Cancel invite error: `, err);
        throw err;
    }
}

const unfriendFriend = async data => {
    const { friendDoc, currentUser } = data
    logger.info(`[${moduleName}] Unfriend friend ... `);
    try {
        let creator = await User.findById(currentUser._id);
        let user = await User.findById(friendDoc._id);
        if (!creator || !user) {
            throw new Error('User not found.');
        }
        let currentFriend
        user.friends.forEach(e => {
            creator.friends.forEach(el => {
                if (e.toString() === el.toString()) {
                    currentFriend = e
                }
            })
        })
        await Friend.deleteOne({ _id: currentFriend._id });
        creator.friends.pull(currentFriend._id);
        user.friends.pull(currentFriend._id);
        await creator.save()
        user = await user.save()
        let response = {
            user: user,
            buttonStatus: await getButtonStatus({ friendDoc: friendDoc, currentUser: currentUser })
        }
        return response;
    } catch (err) {
        logger.error(`[${moduleName}] Unfriend error: `, err);
        throw err;
    }
}

const getButtonStatus = async data => {
    const { friendDoc, currentUser } = data
    logger.info(`[${moduleName}] Calculate status... `);

    try {
        let creator = await User.findById(currentUser._id);
        let user = await User.findById(friendDoc._id);
        if (!creator || !user) {
            throw new Error('User not found.');
        }

        //Find friend in friends list
        if (creator.friends && user.friends) {
            let exists = false;
            creator.friends.forEach(e => {
                let check = user.friends.includes(e)
                if (check) {
                    exists = true
                }
            })
            if (exists) {
                logger.info(`[${moduleName}] Calculate status 'UNFRIEND'... Done `);
                return 'unfriend'
            }
        }

        //Find invite in invites list
        if (creator.invites && user.invites) {
            let currentInvite
            user.invites.forEach(e => {
                creator.invites.forEach(el => {
                    if (e.toString() === el.toString()) {
                        currentInvite = e
                    }
                })
            })
            if (currentInvite) {
                const invite = await Invite.findById(currentInvite);
                if (invite.invitedTo.toString() === creator._id.toString()) {
                    logger.info(`[${moduleName}] Calculate status 'CANCEL'... Done `);
                    return 'cancel'
                } else if (invite.invitee.toString() === creator._id.toString()) {
                    logger.info(`[${moduleName}] Calculate status 'CONFIRM'... Done `);
                    return 'confirm'
                }
            }
        }
        logger.info(`[${moduleName}] Calculate status 'NONE' ... Done `);
        return 'none';
    } catch (err) {
        logger.error(`[${moduleName}] Calculate status error: `, err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    getAllFriends,
    searchUsers,
    createRequest,
    acceptRequest,
    cancelRequest,
    getAllInvites,
    getAllMessages,
    saveMessage,
    getButtonStatus,
    unfriendFriend
}