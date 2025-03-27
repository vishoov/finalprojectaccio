const jwt = require('jsonwebtoken');
const User = require('../model/user.model');




const auth = async (req, res, next) =>{
    try{
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.headers.authorization.replace('Bearer ', '');

        if(!token){
            return res.status(401).json({message : 'Unauthorized User'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        next();


    }
    catch(err){
        return res.status(401).json({message : 'Unauthorized User'});
    }

}


const createToken = async (user) =>{
    try{
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        return token;
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    auth,
    createToken
}