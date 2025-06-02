const Task=require('./../models/task')

//create new task
exports.createtask=async(req,res)=>{
    try {
        
        const {title,description}=req.body;
        const task=new Task({
            title,
            description,
            owner:req.user.userId
        })

        await task.save();
        res.status(201).json(task)
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Error While Creating Task"})
    }
}

//get all task for login user

exports.gettask=async(req,res)=>{
    try {
        const task=await Task.find({owner:req.user.userId});
        res.json(task);
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Error While Getting Task"})
    }
}


//update the exist task
exports.updatetask=async(req,res)=>{
    try {
        
           const taskId=req.params.id
            const{title,description}=req.body
            const task=await Task.findOneAndUpdate(
               {_id:taskId,owner:req.user.userId},//only update when user own it
               {title,description},
               {new:true}
            )
        
            
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task)
        
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Error While Updating Task"})
    }
}

exports.deletetask=async(req,res)=>{
    try {
         const taskId=req.params.id;
          const task=await Task.findOneAndDelete({
              _id: taskId,
               owner: req.user.userId
    })

            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json({message:"Task Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Error While Deleting Task"})
    }
}
