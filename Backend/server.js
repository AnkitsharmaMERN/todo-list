const express = require('express') 
const mongoose = require('mongoose')
const cors = require ('cors')
const cookieParser = require("cookie-parser")


const Taskroute = require('./route/taskroute')
const Userroute = require('./route/userroute')



const app = express()
const port = 27017

app.use(
    cors({
        // origin: "*",
        origin: ['http://localhost:3000', 
        'http://localhost:27017'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
         //access-control-allow-credentials:true
        // optionSuccessStatus:200
}))

app.use(express.json())
app.use(cookieParser())


const mongooseurl = "mongodb://localhost:27017/tododatabase"


const dbconnection = () => {
    mongoose.connect(mongooseurl)
    .then(()=>
    console.log('db connection succesfully'))
    .catch((e)=>
    console.log(e))
}

dbconnection();

app.use('/api/task',Taskroute)
app.use('/api/user',Userroute)




app.listen(port, ()=>{
    console.log(`connection is successfully port no ${port}`)
})