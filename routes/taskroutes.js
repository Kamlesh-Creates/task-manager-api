const express=require('express');
const router=express.Router()
const taskcontroller=require('./../controllers/taskcontroller')
const authmiddleware=require('./../middleware/authmiddleware')

router.post('/',authmiddleware,taskcontroller.createtask)
router.get('/',authmiddleware,taskcontroller.gettask)

module.exports=router
