const express = require ('express');
const { addtask, updatetask, removetask, getalltask } = require('../controller/taskcontroller');
const router = express.Router();




//this is for user add task route
router.post ('/add',addtask)


//this is for read user's task route
router.get ('/alltasks', getalltask)


//this is for update user's task route 

router.put ('/update',updatetask)



// this is for delete user's task route 

router.delete ('/remove/:id',removetask)






module.exports = router;