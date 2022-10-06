const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')



const key = "360circleAnkit"

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "pls enter the first name"]
    },
    Email: {
        type: String,
        unique: true,
        required: [true, "pls enter the Email"]
    },
    Password: {
        type: String,
        required: [true, "pls enter the password"]
    },

    Confirm_Password: {
        type: String,
    },

    resetPasswordcode: {
        type: String,
        default: ''
    },

    tokens: [
        {
            token: {
                type: String,
                // required: true
            }
        }
    ]

})


userSchema.methods.genrateToken = async function () {
    try{
        const token = jwt.sign({ id: this._id.toString() }, key)
        // console.log(token)
        this.tokens = this.tokens.concat({token:token}) 
        await this.save();
        return token 
    }
    catch(error){
    //    console.log(error)
       
        res.status(400).send({
            msg:error.msg
        })
    }
}

    const userdata = mongoose.model("userdata", userSchema)

    module.exports = userdata;