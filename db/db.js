const mongoose = require('mongoose')



console.log("URL-->",process.env.MONGODB_URL)

const connectToDB =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Conneected to DB')
    }).catch(err=>console.log(err))
}
module.exports = connectToDB