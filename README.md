# ProjectI_Backend


# Prerequisites
Before running this project, ensure you have the following installed:

Node.js (v14+)
MongoDB (locally or via a service like MongoDB Atlas)
Getting Started
Follow these steps to set up the project:

# 1. Clone the Repository
bash

git clone https://github.com/theonekrishna/ProjectI_Backend.git

cd ProjectI_Backend


# 2. Install Dependencies
Run the following command to install all the required dependencies:

# bash

npm install express, momgoose, cors, dotenv, helmet, jsonwebtoken, nodemailer, multer,morgan


# 3. Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:

# bash
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/projectI_db
JWT_SECRET=your_jwt_secret
SMTP_EMAIL=Enter email id of SMTP
SMTP_PASSWORD= 16 digit pass of SMTP

# Setting Up SMTP for Email Verification
To enable the feature of sending OTP via email, you'll need to configure SMTP in your environment variables (.env). Follow these steps to set up your SMTP credentials, especially for Gmail users:

Step 1: Enable Two-Factor Authentication (2FA)
Go to your Google Account Security Settings.
Under "Signing in to Google", enable 2-Step Verification.
Follow the steps to turn on 2FA for your account.
Step 2: Generate an App Password
Once 2FA is enabled, you can generate an App Password:

Visit the App Passwords page.
From the "Select app" dropdown, choose Mail.
From the "Select device" dropdown, choose the device you’re setting this up for (or select Other (Custom name) and enter your own label).
Click Generate.
Copy the 16-character App Password displayed on the screen. This will be your SMTP password.

Make sure you replace the values with your actual MongoDB URI, JWT secret, and SMTP credentials.
