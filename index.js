const express=require('express');
const cors=require('cors')
require('dotenv').config({quiet:true});
const mongoose=require('mongoose');

const app=express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connected")})
.catch(err=>{console.log(err)})

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


app.get('/',(req,res)=>{
    res.json({Message:"hello from server"})
})

const Port=process.env.PORT;
app.listen(Port,()=>{
    console.log("Server Started on PORT: "+Port);
})