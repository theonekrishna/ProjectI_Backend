const express = require('express');
const asyncHandler = require('express-async-handler');
const { httpRegisterUser, httpLoginUser, httpSendOTP, httpVerifyOTP } = require('./auth.controller');
const authRouter = new express.Router();

authRouter.post('/account/signup', asyncHandler(httpRegisterUser));
authRouter.post('/account/login', asyncHandler(httpLoginUser));
authRouter.post('/account/send_otp', asyncHandler(httpSendOTP));
authRouter.post('/account/verify_otp', asyncHandler(httpVerifyOTP));

return authRouter