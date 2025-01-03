const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()




app.get('/',(req,res)=>{
    res.send('Hello World')
})


module.exports = app