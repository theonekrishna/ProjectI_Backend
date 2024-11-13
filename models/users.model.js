const User = require('./users.mongo')

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function postUser(data) {
    await User.create(data);
}

async function verifyUser(user_id) {
    let user = User.findOne({ user_id });
    user.email_verified = true;
    await user.save();
}


module.exports = {
    findUserByEmail,
    postUser,
    verifyUser
}