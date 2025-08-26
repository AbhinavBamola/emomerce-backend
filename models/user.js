const{Schema,model}=require('mongoose');
const bycrpt=require('bcrypt');

const userSchema=new Schema({
name:{
    type:String,
    required:true
}
,email:{
    type:String,
    required:true,
    unique:true
}
,password:{
    type:String,
    required:true
}
,role:{
    type:String,
    default:'user'
}
,profileImage:{
    publicid:{
        type:String
    }
    ,url:{
        type:String
    }
}
,orders:[{type:Schema.Types.ObjectId,
    ref:"ecomerceordermodel"
}]
,cart:[{type:Schema.Types.ObjectId,
    ref:"ecomerceproductmodel"
}]
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log(this);
    const salt=await bycrpt.genSalt(10);
    const hashed=await bycrpt.hash(this.password,salt);
    this.password=hashed;
    }
    next();
})

userSchema.methods.comparePassword=async function(providedPassword) {
    return await bycrpt.compare(providedPassword,this.password);
}

const userModel=model('ecomerceusermodel',userSchema);

module.exports=userModel;