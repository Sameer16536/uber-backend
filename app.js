const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes  = require('./routes/captain.routes')


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
app.use('/captains',captainRoutes)
app.use('/maps',)
app.use('/rides',)




module.exports = app