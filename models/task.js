const mongoose=require("mongoose");

const taskschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
        
    },
description:{
    type:String,
    required:true
    
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // This links the task to a user 
    required: true
  }

})

const Task=mongoose.model('Task',taskschema)
module.exports=Task;