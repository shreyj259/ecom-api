const CustomError=require('../errors')
const {isTokenValid} = require('../utils')


const authenticateUser=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        throw new CustomError.UnauthenticatedError("Authentication Failed")
    }
    try {
        const payload=isTokenValid({token});
        req.user={name:payload.name,userId:payload.userId,role:payload.role}
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Failed")
    }
}

const authorizePermissions=(req,res,next)=>{
    if(req.user.role !=='admin'){
        throw new CustomError.UnauthorizeError("Unauthorized to this route")
    }
    next()
}


module.exports={authenticateUser,authorizePermissions}