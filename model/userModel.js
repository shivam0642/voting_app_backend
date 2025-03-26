const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
    ,age:{
        type:Number,
        required:true
    },
    aadharCardNumber:{
        type:Number,
        required:true,
        unique:true
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    password:{
        required:true,
        type:String
    },
    isVoted:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('user',UserSchema)