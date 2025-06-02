const express=require("express")
const db=require('./database')
require('dotenv').config();
const app=express()
app.use(express.json())
const personRoutes=require('./routes/personroutes');
const taskRoutes=require('./routes/taskroutes');

app.use('/users',personRoutes)
app.use('/tasks',taskRoutes)




const port=process.env.PORT ||3000;
app.listen(port,()=>{
    console.log(`Server is Listing on port ${port}`)
})