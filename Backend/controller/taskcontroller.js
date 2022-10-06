const taskdata = require('../model/task')
const userdata = require('../model/user')
const jwt = require("jsonwebtoken")
// const mongoose = require("mongoose")



const key = "360circleAnkit"

const addtask = async (req, res, next) => {
    try {
        const jwttoken = req.cookies.jwttoken
        if (jwttoken) {
    
            const decode = jwt.verify(jwttoken, key)
            const user = await userdata.findById(decode.id)
            if (user) {
                const inserttask = await taskdata.create({
                    description: req.body.description,
                    category: req.body.category,
                    userdetails: user._id
                })
                res.status(200).json(inserttask)
            }
        } else {
            res.status(201).send({
                msg: 'please login'
            })
        }
    }
    catch (e) {
        res.status(400).send(error)
    }
}


const updatetask = async (req, res, next) => {
    try {
        const id = req.params.id
        const description = req.body.description
        const category = req.body.category

        if (id) {
            const task = await taskdata.findById(id)

            const updattask = await taskdata.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        description: description, category: category
                    }
                }, { new: true })
            res.status(200).json(updattask)
        }
    }
    catch (e) {
        res.status(400).send(error)
    }
}


const removetask = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id)
        if (id) {
            const removetask = await taskdata.findByIdAndDelete({ _id: id })
            res.status(200).json({
                msg: 'task successfully deleted'
            })
        }

    }
    catch (e) {
        res.status(400).send(error)
    }
}


const getalltask = async (req, res, next) => {
    try {
        // const ObjectId = mongoose.Types.ObjectId
        const jwttoken = req.cookies.jwttoken
        console.log(jwttoken)
        const decode = jwt.verify(jwttoken,key)
        console.log(decode)
        const user = await userdata.findById(decode.id)
        console.log(user._id)
        if (user) {
            const alltask = await taskdata.find({userdetails: user._id})
            console.log(alltask)
            res.status(200).json(alltask)
        }
        else {
            res.status(201).send({
                msg: 'your token is invalid'
            })
        }
    } catch (e) {
        res.status(400).send(error)
    }
}




module.exports = {
    addtask,
    updatetask,
    getalltask,
    removetask
}