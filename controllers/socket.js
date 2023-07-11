const User = require('../models/user');

const connectedUser = async(uid = '') => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;

}

const disconnectedUser = async(uid = '') => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}



const deleteMessage = async (uid = '') => {
    try { 
        const user = await User.findById(uid);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    connectedUser,
    disconnectedUser,
    deleteMessage
}