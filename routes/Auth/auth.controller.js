const { generateToken, checkCredentials, verifyToken } = require('../../services/token'); // Path to token.js
const { sendOTP } = require('../../services/smtp');
const { findUserByEmail, postUser } = require('../../models/users.model');
const { postRequest, getOTPForUser } = require('../../models/otp.model');


async function httpRegisterUser(req, res) {
    const registerData = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(registerData.email)
    if (existingUser) {
        return res.status(400).json({ Status: 0, Message: 'User already exists' });
    }

    // Create a new user
    const newUser = await postUser(registerData)

    // Optionally generate a token (you can do this in the login step instead)
    const token = generateToken({ userId: newUser._id });

    res.status(200).json({ Status: 1, Message: 'User created successfully', token });
}

async function httpLoginUser(req, res) {
    const { email, password } = req.body;

    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ Status: 0, Message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.email_verified) {
        return res.status(400).json({ Status: 0, Message: 'Email not verified' });
    }

    // Compare the password
    const isMatch = await user.checkCredentials(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ Status: 0, Message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({ userId: user._id });

    res.status(200).json({ Status: 1, Message: 'Login successful', token });
}


async function httpSendOTP(req, res) {
    const { email } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ Status: 0, Message: 'User not found' });
    }

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000)
    await sendOTP(email, otp);
    await postRequest({ user_id: user._id, otp: otp })

    res.status(200).json({ Status: 1, Message: 'OTP sent to email' });
}


async function httpVerifyOTP(req, res) {
    const { email, otp } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ Status: 0, Message: 'User not found' });
    }

    const userOTP = await getOTPForUser(user._id)

    // Check if the OTP matches
    if (userOTP === otp) {
        await verifyUser(user._id)
        return res.status(200).json({ Status: 1, Message: 'Email verified successfully' });
    } else {
        return res.status(400).json({ Status: 0, Message: 'Invalid OTP' });
    }
}

module.exports = {
    httpRegisterUser,
    httpLoginUser,
    httpSendOTP,
    httpVerifyOTP
};