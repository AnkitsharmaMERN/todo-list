const mongoose = require('mongoose');
const userdata = require('./user');



const taskSchema = new mongoose.Schema({

            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
    

    userdetails:{
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'userdata'
}

    // date: {
    //     type: Date,
    //     required: true
    // }

})


const taskdata = mongoose.model('taskdata', taskSchema)

module.exports = taskdata;