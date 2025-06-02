const Person=require('./../models/person')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_SECRET=process.env.jwt_key;


exports.signup=async (req,res)=>{
    try {
        const {username,password,name}=req.body;

    //if username already exist in database
        const existuser=await Person.findOne({username});
        if(existuser) return res.json({message:"Username Already Exist"})
//for creating newuser
        const newuser=new Person({username,password,name});
        await newuser.save();
        res.status(200).json({message:"New User Created Successfully"})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'server error during signup'})
    }
}


exports.login=async (req,res)=>{
    try {
        const {username,password,name}=req.body;

        //find the person by username
        const user= await Person.findOne({username});
        if(!user){
            res.status(401).json({message:"Username Not Found"})
        }


        // for checking password 
        const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Username or Password" });}
//Generate JWT token
 const token=jwt.sign({userId:user._id,username:user.username},JWT_SECRET,{ expiresIn: '1h' })
res.json({token,message:"login successfull"});
    }catch (error) {
        console.log(error)
        res.status(500).json({message:'server error during login'})
    }
}
