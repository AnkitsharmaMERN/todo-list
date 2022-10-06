const express = require ('express');
const { userRegister, login, userDetails, forgetPassword, updatePassword, updateuserdetails } = require('../controller/usercontroller');
const router = express.Router();




//this is for user Registration route
router.post ('/signup',userRegister)


// this is for user lofin route 
router.post('/login',login)


//this is for read user detailas route
router.get ('/Profile',userDetails)


//this is for forget password 
router.post ('/Forget-password',forgetPassword )


//this is for reset-password
 router.post('/reset-password',updatePassword)



//this is for update user details  route 

router.put ('/userdetails', updateuserdetails)



module.exports= router;