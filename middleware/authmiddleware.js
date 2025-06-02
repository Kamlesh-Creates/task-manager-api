const jwt=require('jsonwebtoken')

const jwt_key=process.env.jwt_key;

const authmiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message:"Token Required"})
    }
    const token=authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token,jwt_key);
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({message:"Token Expired"})
    }
    
}
module.exports=authmiddleware;   