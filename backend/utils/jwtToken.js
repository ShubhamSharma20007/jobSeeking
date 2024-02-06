
const sendToken =async (user,statusCode,res,message,userData)=>{
        const token = await user.getJWTToken();
        //options for cookie
        const options ={
            expires : new Date(
                // hour * minute * second * milisecond
                Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
            ),
            httpOnly : true
        }
        const response =   res.status(statusCode).cookie("token",token,options).json({
            success:true,
            message,
            authorized: token,
            userData
        })
        console.log(response)
        return response;

}
module.exports = sendToken;