const jwt=require('jsonwebtoken');
const secret="mysecretecomerce";

function generatetokenforuser(user){
        const paylod={
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImage:user.profileImage,
            orders:user.orders,
            cart:user.cart
        }

        const token= jwt.sign(paylod,secret);

        return token;
}

function verifytoken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={generatetokenforuser,verifytoken};