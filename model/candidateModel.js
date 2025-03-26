const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    party:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:18
    },
    votes:[
       {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        votedAt:{
            type:Date,
            default:Date.now
        }
    }
    ],
    email:{
        type:String,
        required:true
    },
    totalVotes : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('Candidate',candidateSchema)