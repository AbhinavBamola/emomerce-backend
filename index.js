const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config({quiet:true});
const mongoose=require('mongoose');

const userRouter=require('./routes/user.js');
const authenticatorMiddleware=require('./middleware/authentication.js');

const app=express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connected")})
.catch(err=>{console.log(err)})

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(authenticatorMiddleware);

app.get('/api/me',(req,res)=>{
    res.json({Message:"hello from server",
        user:req.user,
    })
})
app.use('/user',userRouter);


const Port=process.env.PORT;
app.listen(Port,()=>{
    console.log("Server Started on PORT: "+Port);
})