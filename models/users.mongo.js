const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // user's email
    phone_number: { type: String, required: true },
    password: { type: String, required: true },            // Hashed password
    otp: { type: Number },
    token: { type: String },
    email_verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

userSchema.methods.checkCredentials = async function (password, hashed) {
    return await bcrypt.compare(password, hashed);
}

module.exports = mongoose.model("User", userSchema);