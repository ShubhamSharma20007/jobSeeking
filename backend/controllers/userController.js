const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

const register = async(req, res, next) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }
    const isFound = await User.findOne({email:email})
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
    await user.save()
     //   using jwtToken response
//user,statusCode,res,message  <= parameter

sendToken(user,201,res,"User Created Successfully !",user)
}


const login =async(req,res)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return res.status(400).send({message:"Please fill all the fields"})
    }
    const user =  await User.findOne({email})
    if(!user){
        return res.status(401).send({message:"Invalid Credentials"})
    }
    const comparePassword =  await user.comparePassword(password)
    if(!comparePassword){
        return res.status(401).send({message:"Invalid Password Credentials"})
    }
    
    return sendToken(user,200,res,"User Logged In Successfully !")
}



const logout =async(req,res)=>{
    res.status(201).cookie("token","",{
        httpOnly : true,
        expires :new Date(Date.now())
    }).json({message:"User Logged Out Successfully !",success : true})

}

module.exports = {register,login,logout};