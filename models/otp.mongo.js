const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('OTP', otpSchema);