const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')
const {attachCookiesToResponse,createTokenUser}=require('../utils')

const register = async (req, res) => {
    const {name,email,password}=req.body;
    const emailAlreadyExists=await User.findOne({email:email})

    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists')
    }

    const user=await User.create({name,email,password});

    const tokenUser=createTokenUser(user)
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user})

}


const login = async (req, res) => {
    const {email,password}=req.body
    
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide an email and passwrod")
    }

    const user=await User.findOne({email})

    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials")
    }

    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }

    const tokenUser=createTokenUser(user)
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({user})

}

const logout = async (req, res) => {
    res.cookie('token','logout',{httpOnly:true,expires:new Date(Date.now()+5 * 1000)})
    res.status(StatusCodes.OK).json({msg:'user logged out'})
}

module.exports = {
    login,
    register,
    logout
}
