const userdata = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')



const key = "360circleAnkit"


const userRegister = async (req, res, next) => {
    try {
        const { Name, Email, Password } = req.body
        console.log(Name)
        const userdetails = await userdata.findOne({ Email: Email })
        // console.log(userdetails)
        if (userdetails) {
            res.status(404).send({ msg: "user already exist" })
        }
        else {
            const secpassword = await bcrypt.hash(Password, 10)
            const user = await userdata.create({
                Name: Name,
                Email: Email,
                Password: secpassword
            })
            sendtoken(user, 201, res)
            // res.status(200).send(res)
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
}


const login = async (req, res, next) => {
    try {
        const Email = req.body.Email
        const Password = req.body.Password
        console.log(Email)

        const user = await userdata.findOne({ Email: Email })
        console.log(user)
        if (user) {
            const passwordMatch = await bcrypt.compare(Password, user.Password)
            if (passwordMatch) {
                sendtoken(user, 200, res)
            }
            else {
                res.status(201).send({ msg: 'username and password is invalid' })
            }
        }
        else {
            res.status(201).send({ msg: 'username and password is invalid' })
        }

    }
    catch (e) {
        res.status(400).send(e)
    }
}


const userDetails = async (req, res, next) => {
    try {
        const jwttoken = req.cookies.jwttoken
        console.log(jwttoken)
        // if (jwttoken) {
            const decode = jwt.verify(jwttoken, key)
            console.log(decode)
            const user = await userdata.findById(decode.id)
            res.status(200).json(user)
        // } 
        // else {
        //     res.status(404).send({
        //         msg: 'token is invalid'
        //     })
        // }

    }
    catch (error) {
        res.status(400).json({
            msg:'token is invalid',
            error
        })
    }
}


const updateuserdetails = async (req, res, next) => {
    try {
        const jwttoken = req.cookies.jwttoken
        const Name = req.body.Name
        console.log(Name)
        const Email= req.body.Name
        console.log(jwttoken)
        if (jwttoken) {
            const decode = jwt.verify(jwttoken, key)
            console.log(decode)
            const user = await userdata.findById(decode.id)
            console.log(user)
            const updatedata = await userdata.findByIdAndUpdate({ _id: user._id },
                // console.log(user)
                { $set: { Name: Name, Email: Email } }, { new: true })
            console.log(updatedata)
            res.status(200).json({
                msg: "data successfully updated"
            })
            // res.status(200).json(updatedata)
        }
        // res.status(200).json(updatedata)

    } catch (error) {
        res.status(400).send(error)
    }
}



    const forgetPassword = async (req, res, next) => {
        try {
            const Email = req.body.Email
            console.log(Email)
            const user = await userdata.findOne({ Email: Email })
            console.log(user)
            if (user) {
                // const code = randomstring.generate();
                const code = Math.floor(100000 + Math.random() * 900000)
                console.log(code)
                const codedata = await userdata.updateOne({ Email: Email }, { $set: { resetPasswordcode: code } })
                console.log(codedata)
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport for only testing purpose---------------------
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: "bar@example.com, baz@example.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: `Hello ${user.First_Name}?`, // plain text body  
                    // html: "<b>Hello world?</b>", // html body
                    html: '<p> hii ' + user.First_Name + ', please copy the ' + String(code) + 'link <a href ="link reset page of url "> and reset your password </a>'

                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


                if (info.messageId) {
                    res.status(200).send({
                        msg: "otp has been sent"
                    })
                }

            }

        } catch (error) {
            res.status(401).send({
                msg: error.message
            })
        }
    }

    const updatePassword = async (req, res, next) => {
        try {
            const code = req.body.otp
            console.log(code)
            const codedata = await userdata.findOne({ resetPasswordcode: code })
            console.log(codedata)
            if (codedata) {
                const password = req.body.Password
                console.log(password)
                if (password) {
                    console.log(password)
                    const secpassword = await bcrypt.hash(password, 10)
                    console.log(secpassword)
                    const user = await userdata.updateOne({ _id: codedata.id }, { $set: { Password: secpassword } }, { new: true })
                    console.log(user)
                    res.status(200).json({
                        msg: "your password has been reset",
                        user
                    })
                }
            } else {
                res.status(201).send({
                    msg: "This link has been expired"

                })
            }
        } catch (error) {
            res.status(400).send({
                msg: 'invalid details'
            })
        }
    }



    const sendtoken = async (user, statuscode, res) => {
        // console.log(user)
        const token = await user.genrateToken()
        // console.log(token)
        res.cookie('jwttoken', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })
            .json({
                token,
                user
            })
    }






    module.exports = {
        userRegister,
        login,
        userDetails,
        forgetPassword,
        updatePassword,
        updateuserdetails

    }