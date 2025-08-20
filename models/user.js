const{Schema,model}=require('mongoose');

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

const userModel=model('ecomerceusermodel',userSchema);

module.exports=userModel;