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

userSchema.pre('save',async()=>{
    const salt=bycrpt.salt(10);
    const hashed=await bycrpt.hash(this.password,salt);
    this.password=hashed;
})

userSchema.methods.comparePassword=async function(providedPassword) {
    return await bycrpt.compare(providedPassword,this.password);
}

const userModel=model('ecomerceusermodel',userSchema);

module.exports=userModel;