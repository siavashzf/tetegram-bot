//////////
const mongoose = require('mongoose');
const User = require("./model/User")
/////////


////////

const Db = {
    connect: async(uri)=>{
        try {
           let ddd = await mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
                console.log("conected");
                return ddd;
        } catch (error) {
            console.log(error)
        }
    },
    getUserName: async (chatId)=>{
        try {
            let user = await User.findOne({chatId:chatId});
            
            if(user)
                return user.userName;
            else
                throw `no user whit ${chatId} chatId `;

        } catch (error) {
            throw error;
        }     
    },
    createNewUser: async (chatId,userName)=>{
        try {
            let newUser = new User({chatId:chatId,userName:userName});
            let user = await newUser.save();
            if(user)
                return user;
            else  
                throw "user alredy exist"
        } catch (error) {
            throw error;
        }
    },
    changeUserName: async (chatId,userName)=>{
        try {
            let user = await User.findOneAndUpdate({chatId:chatId},{userName:userName});
            return user;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Db;