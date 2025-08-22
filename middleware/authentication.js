const {verifytoken}=require('../services/authentication.js');

async function authenticatorMiddleware(req,res,next) {
    try{    
            console.log(req.cookies);
            const token=req.cookies.token;
            if(!token){
                req.user=null;
                throw new Error("Please Login/Signup As No token was recived",{})
            }
            else{
            const payload=verifytoken(token);
            req.user=payload;
            next();
            }
    }
    catch(err){
        console.log(err.message);
        next();
    }
}

module.exports=authenticatorMiddleware;