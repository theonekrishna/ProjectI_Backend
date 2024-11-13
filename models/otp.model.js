const OTP = require('./otp.mongo')

async function postRequest(data) {
    return await OTP.create(data)
}

async function getOTPForUser(user_id) {
    return await OTP.findOne({ user_id }).select('token -_id')
}

module.exports = {
    postRequest,
    getOTPForUser
}