
const mongoose = require('mongoose');

const userSchima= new mongoose.Schema({
    chatId:{
        type:Number,
        required:true,
        
    },
    userName:{
        type:String,
        required:true,
        unique:true
    }
});
const User= mongoose.model("User",userSchima);
module.exports = User;

