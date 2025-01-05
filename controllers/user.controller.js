const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blacklistToken.model')
const {validationResult, body}  = require('express-validator')
const userService = require('../services/user.service')


module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullName,email,password} = req.body

    //Check if user already exists
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(409).json({message:"User already exists"})
    }

    //hash the input password using function created in model.js
    const hashedPassword = await userModel.hashPassword(password)

    //Create the user using userService
    const user = await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email:email,
        password:hashedPassword
    })

    //Create token 
    const token = user.generateAuthToken()
    
    res.status(201).json({ token, user });
}

module.exports.loginUser = async(req,res,next)=>{
    //Error Handling for Validation
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{email,password} = req.body
    
    //Check if user exists
    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({message:"User not found"})
    }

    const userExists = await user.comparePassword(password)
    if(!userExists){
        res.status(401).json({message:"Invalid email or password"})
    }

    const token = user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,user})
    
}


module.exports.getUserProfile =async(req,res,next)=>{
    res.status(200).json(req.user);
}


module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    await blacklistTokenModel.create({token})
    res.status(200).json({ message: 'Logged out' });
}