const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, " Name content must be 3 characters !"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email !"]
    },
    phone: {
        type: Number,
        require: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should be atleast and Greater then 6 Characters"]
    },
    role: {
        type: String,
        required: true,
        enum: ['Job Seeker', "Employer"]
    }
}, { timestamps: true })


//  Hashing the password
userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// comparing password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Genrating the JWT token
userSchema.methods.genrateJsonWebToken = async function() {
    const options = {
        expiresIn: process.env.JWT_EXPIRY
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, options)
}


const User = mongoose.model("User", userSchema)
module.exports = User;