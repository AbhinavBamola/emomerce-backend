const{Schema,model}=require('mongoose');

const productSchema=new Schema({
name:{
    type:String,
    required:true
}
,desciption:{
    type:String,
    required:true,
}
,category:{
    type:String,
    required:true
}
,productImage:{
    publicid:{
        type:String
    }
    ,url:{
        type:String
    }
}
,price:{
    type:Number,
    required:true
}
,stock:{
    type:Number,
    required:true
}
},{timestamps:true})

const productModel=model('ecomerceproductmodel',productSchema);

module.exports=productModel;