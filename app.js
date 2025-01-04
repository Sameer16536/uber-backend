const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes')


dotenv.config()
const app = express()
connectToDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/users',userRoutes)




module.exports = app