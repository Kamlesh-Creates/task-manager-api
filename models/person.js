const mongoose=require("mongoose");
const bcrypt=require('bcrypt')
const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
username:{
    type:String,
    unique:true,
    required:true
},
password:{
type:String,
required:true
}
})
personschema.pre('save',async function(next) {
    const person=this
    if(!person.isModified('password')) return next();
//hashing the password
    try {
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(person.password,salt)
        person.password=hashpassword
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

personschema.methods.comparePassword=async function(candidatepassword) {
    const person = this;
    try {
        return await bcrypt.compare(candidatepassword,person.password);
    } catch (error) {
        console.log(error)
    }
    
}
const Person=mongoose.model('Person',personschema)
module.exports=Person

