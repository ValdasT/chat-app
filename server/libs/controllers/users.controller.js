const User = require('../models/user');
const createUser = async userData => {
    console.log(userData);
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const user = new User({
            email: userData.email,
            name: userData.name,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });

        const result = await user.save();
        return { ...result._doc };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getUser = async userEmail => {
    try {
        console.log(userEmail);
        const userProfile = await User.findOne({ email: userEmail });
        return { ...userProfile._doc };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateUser = async (args, req) => {
    try {
        const user = await User.findByIdAndUpdate(args.userId,
            {
                name: args.name,
                surname: args.surname,
                email: args.email,
                updatedAt: args.updatedAt
            },
            { new: true });
        return {
            ...user._doc,
            _id: user.id
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}