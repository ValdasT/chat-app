const User = require('../models/user');
const Invite = require('../models/invite')
const Notification = require('../models/notification')
const Friend = require('../models/friend')
const Chat = require('../models/chat')
const Message = require('../models/message')
const logger = require('../utils/logger');
const moduleName = module.filename.split('/').slice(-1);
const { getRandomCollor, NOTIFICATIONS_ABOUT } = require('../utils/utils')

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
    // const { user } = args
    // try {
    //     logger.info(`[${moduleName}] Get all friends...`);
    //     let friendsWithLastMessage = []
    //     const userDoc = await User.findById(user);
    //     if (userDoc.friends.length) {
    //         let friendsDocs = await Friend.find().where('_id').in(userDoc.friends).exec()
    //         logger.info(`[${moduleName}] Get all friends...Done. Found:${friendsDocs.length}`);
    //         let userProfileIds = friendsDocs.map(e => {
    //             if (e.friend.toString() === user) {
    //                 return e.creator
    //             } else {
    //                 return e.friend
    //             }
    //         })
    //         let friendsProfiles = await User.find().where('_id').in(userProfileIds).select({
    //             "name": 1, "email": 1, "surname": 1, "_id": 1, "picColor": 1, 'messages': 1
    //         });

    //         console.log(friendsProfiles)
    //         console.log("<><><><><><><")
    //         const usersChatsLastMessages = await Chat.find({ _id: { $in: userDoc.messages } }).select({ "messages": { "$slice": -1 } }).populate('messages');

    //         friendsProfiles.forEach(profile => {
    //             profile.messages.forEach(chatId => {
    //                 usersChatsLastMessages.forEach(myChat => {
    //                     if (chatId.toString() === myChat._id.toString()) {
    //                         friendsWithLastMessage.push({
    //                             profile: profile,
    //                             lastMessage: myChat.messages.length ? myChat.messages[0] : {
    //                                 message: '',
    //                                 createdAt: '0'
    //                             },
    //                             chatId: myChat._id
    //                         })
    //                     }
    //                 })
    //             })
    //         })
    //     }

    //     return friendsWithLastMessage.sort((a, b) => a.lastMessage.createdAt.localeCompare(b.lastMessage.createdAt)).reverse()
    // } catch (err) {
    //     logger.error(`[${moduleName}] Get all friends error: `, err);
    //     throw err;
    // }
}

const getAllChatsInfo = async (args) => {
    const { user } = args
    let res = []
    try {
        logger.info(`[${moduleName}] Get all chats info...`);
        const userDoc = await User.findById(user);
        const usersChatsWithLastMessages = await Chat.find({ _id: { $in: userDoc.chats } }).select({ "messages": { "$slice": -1 } }).populate('messages').populate('users')
        usersChatsWithLastMessages.forEach(chats => {
            let userWithOutCurrentUser = []
            chats.users.forEach(user => {
                if (user._id.toString() !== userDoc._id.toString()) {
                    userWithOutCurrentUser.push({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        surname: user.surname,
                        picColor: user.picColor
                    })
                }
            })
            res.push({
                _id: chats._id,
                users: userWithOutCurrentUser,
                message: chats.messages.length ? chats.messages[0] : {
                    message: '',
                    createdAt: '0'
                },
                createdAt: chats.createdAt
            })
        })
        logger.info(`[${moduleName}] Get all chats info...`);
        return res.sort((a, b) => a.message.createdAt.localeCompare(b.message.createdAt)).reverse()

    } catch (err) {
        logger.error(`[${moduleName}] Get all friends error: `, err);
        throw err;
    }
}

const getAllMessages = async (args) => {
    const { chatId } = args
    try {
        logger.info(`[${moduleName}] Get messages...`);
        const chatMessages = await Chat.findById(chatId).populate('messages');
        logger.info(`[${moduleName}] Get messages... Done`);
        return chatMessages
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
    const notification = new Notification({
        notifier: currentUser._id,
        notifiee: userData._id,
        notifyAbout: NOTIFICATIONS_ABOUT.sendFriendRequest,
        type: 'Friend request',
        createdAt: new Date().getTime(),
        url: `/users/${currentUser._id}`,
        seen: false,
        clicked: false
    });
    try {
        let newNotification = await (await notification.save()).toObject();
        newNotification.notifier = {
            _id: currentUser._id,
            name: currentUser.name,
            surname: currentUser.surname,
            profilePic: currentUser.profilePic,
            picColor: currentUser.picColor
        }
        invite.notificationDoc = newNotification._id;
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
            buttonStatus: await getButtonStatus({ friendDoc: userData, currentUser: currentUser }),
            notification: newNotification
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

    const notification = new Notification({
        notifier: currentUser._id,
        notifiee: friendDoc._id,
        notifyAbout: NOTIFICATIONS_ABOUT.acceptedFriendRequest,
        type: 'Friend request accepted',
        createdAt: new Date().getTime(),
        url: `/users/${currentUser._id}`,
        seen: false,
        clicked: false
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
        let newNotification = await (await notification.save()).toObject();
        newNotification.notifier = {
            _id: currentUser._id,
            name: currentUser.name,
            surname: currentUser.surname,
            profilePic: currentUser.profilePic,
            picColor: currentUser.picColor
        }

        let oldChat = await Chat.find({ users: { $all: [friendDoc._id, currentUser._id] }, chatType: { $in: 'FRIENDS' } })
        let newChat = {}
        if (!oldChat.length) {
            const chat = new Chat({
                createdAt: new Date().getTime(),
                chatType: 'FRIENDS'
            });
            chat.users.push(creator)
            chat.users.push(user)
            newChat = await chat.save();
            creator.chats.push(chat);
            user.chats.push(chat);
        }

        creator.friends.push(friend);
        user.friends.push(friend);
        creator.invites.pull(currentInvite._id);
        user.invites.pull(currentInvite._id);
        await creator.save()
        user = await user.save()
        let response = {
            user: user,
            buttonStatus: await getButtonStatus({ friendDoc: friendDoc, currentUser: currentUser }),
            notification: newNotification,
            newChat: newChat
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
        let inviteFromDb = await Invite.findById(currentInvite);
        await Invite.deleteOne({ _id: inviteFromDb._id });
        await Notification.deleteOne({ _id: inviteFromDb.notificationDoc });
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

const getAllNotifications = async user => {
    logger.info(`[${moduleName}] getting all notifications... `);
    try {
        const response = await Notification.find({ notifiee: { $in: user } }).sort({ createdAt: -1 }).populate('notifier', '_id name surname picColor profilePic')
        logger.info(`[${moduleName}] getting all notifications... Done `);
        return response;
    } catch (err) {
        logger.error(`[${moduleName}] getting all notifications error: `, err);
        throw err;
    }
}

const updateNotifications = async data => {
    const { notifications, notification } = data
    logger.info(`[${moduleName}] updating notifications... `);
    try {
        if (notification) {
            let notificationDoc = await Notification.findById(notification);
            notificationDoc.clicked = true
            notificationDoc = await notificationDoc.save()
            logger.info(`[${moduleName}] updating notification... Done`);
            return notificationDoc
        } else {
            let resInfo = await Notification.updateMany({ _id: { $in: notifications } }, { $set: { seen: true } })
            logger.info(`[${moduleName}] updating notifications... Done`);
            return resInfo;
        }
    } catch (err) {
        logger.error(`[${moduleName}] updating notifications error: `, err);
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
    getAllChatsInfo,
    searchUsers,
    createRequest,
    acceptRequest,
    cancelRequest,
    getAllInvites,
    getAllMessages,
    saveMessage,
    getButtonStatus,
    unfriendFriend,
    getAllNotifications,
    updateNotifications
}