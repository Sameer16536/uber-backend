const mongoose = require('mongoose')


const connectToDB =()=>{
    mongoose.connect(process.env.MONOGODB_URL)
    .then(()=>{
        console.log('Conneected to DB')
    }).catch(err=>console.log(err))
}