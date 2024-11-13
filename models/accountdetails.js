const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // user's email
    phone_number: { type: String, required: true },
    password: { type: String, required: true },            // Hashed password
    otp: { type: Number },
    token: {type: String},
    email_verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;