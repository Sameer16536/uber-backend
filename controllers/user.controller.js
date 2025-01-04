const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blacklistToken.model')
const {validationResult}  = require('express-validator')
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
        return res.status(400).json({message:"User already exists"})
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