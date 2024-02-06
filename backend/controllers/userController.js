const User = require("../models/userModel");
const register = async(req, res, next) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }
    const isFound = await User.findOne({ $or: [{ email: email }, { phone: phone }] })
    if (isFound) {
        return res.status(400).send({ message: "User already exists" })
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    })
    res.status(201).json({
        message: "user created successfully",
        user
    })
}


module.exports = register;