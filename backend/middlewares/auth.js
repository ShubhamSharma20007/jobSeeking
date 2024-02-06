const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const isAuth = async(req, res, next) => {
  
    const token = req.cookies;
    console.log(token)
   
    // if (!token) {
    //     return res.status(401).send({ error: "Please Login to access this resource" })
    // }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // req.user = await User.findById(decoded._id);
    next()
}

module.exports = isAuth;