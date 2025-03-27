const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    imageUrl:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    seller:{
        //user -> role ->seller or admin
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
        default:null,

    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    stock:{
        type:Number,
        required:true,
        trim:true,
    },
   
}, {
    timestamps:true,
    //createdAt, updatedAt -> automatically created by mongoose
    versionKey:false,
    //__v -> automatically created by mongoose -> product's version
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;