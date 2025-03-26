
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator').isEmail;

//info in user model

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Please provide your name'],
        trim:true,
        unique:false,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        require:[true, 'Please provide your email'],
        trim:true,
        unique:[true, 'Email already exists'],
        lowercase:true,
        validate:[isEmail, 'Please provide a valid email']
    },
    password:{
        type:String,
        require:[true, 'Please provide a password'],
        minlength:6,
        maxLength:20,

    },
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1627752728/default-user-image.png'
    },
    address:{
        type:String,
        default:'',
        trim:true,
        
    },
    zipcode:{
        type:Number,
        default:'',
        trim:true,
        minlength:6,
        maxlength:6,
        required:false
    },
    role:{
        type:String,
        enum:['user', 'admin', 'seller'],
        default:'user'
    }
});

//password hashing
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            next();
        }

        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
})


userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        return next(err, false);
    }
};




const User = mongoose.model('User', userSchema);

module.exports = User;
