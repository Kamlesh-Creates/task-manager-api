const mongoose=require("mongoose")
require('dotenv').config();
//local url for database
const mongourl=process.env.mongo_url;

const connectdb=async()=>{

    try {
       await mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 
})
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error)
        console.log("MongoDB connection error")
    }


}
connectdb()

const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

db.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

db.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

module.exports=db;


