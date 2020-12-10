
const mongoose = require('mongoose');

const userSchima= new mongoose.Schema({
    chatId:{
        type:Number,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Number,
        required:true,
    }
});
const User= mongoose.model("User",userSchima);
module.exports = User;

