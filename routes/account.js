const express  = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const { generateToken, checkCredentials, verifyToken } = require('../services/token'); // Path to token.js
const {sendOTP} = require('../services/smtp');
const bcrypt = require('bcrypt');

// Models 
const User = require('../models/accountdetails');



// User Account Routes

router.post('/account/signup', async (req, res) => {
    try {
        const { username, password, first_name, last_name, email, phone_number } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({Status:0, Message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            user_id: new mongoose.Types.ObjectId().toString(),
            username,
            password: hashedPassword,
            first_name,
            last_name,
            email,
            phone_number,
        });

        await newUser.save();

        // Optionally generate a token (you can do this in the login step instead)
        const token = generateToken({ userId: newUser._id });

        res.status(200).json({Status:1, Message: 'User created successfully', token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/account/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({Status:0, Message: 'Invalid credentials' });
        }

        // Check if email is verified
        if (!user.email_verified) {
            return res.status(400).json({Status:0, Message: 'Email not verified' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({Status:0, Message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ userId: user._id });

        res.status(200).json({Status:1, Message: 'Login successful', token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Send OTP
router.post('/account/send_otp', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({Status:0,Message:'User not found'});
        }

        // 2. Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000)

        await sendOTP(email, otp);


        user.otp = otp; 
        user.email_verified = false; 
        await user.save();

        res.status(200).json({Status:1,Message:'OTP sent to email'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
});


router.post('/account/verify_otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({Status:0, Message: 'User not found' });
        }

        // Check if the OTP matches
        if (user.otp === otp) {
            user.email_verified = true;
            user.otp = null; 
            await user.save();
            return res.status(200).json({Status:1, Message: 'Email verified successfully' });
        } else {
            return res.status(400).json({Status:0, Message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;