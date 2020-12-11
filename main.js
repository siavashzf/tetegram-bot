
const token = require("./config/key").token;
const dataBaseUrl = require("./config/key").dataBaseUrl; 

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
const express = require('express');
const status = require("./status");
const lang = require('./config/lang');
const User = require('./model/User');

const port = process.env.PORT || 8080;

const bot = new TelegramBot(token);

const app = express();
app.use(express.json());



app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});


mongoose.connect(dataBaseUrl,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
// Start Express Server
    app.listen(port, () => {
      console.log(`Express server is listening on ${port}`);
    });
    console.log("connected to databaes and app run");
}).catch((err)=>{
  console.log("NOT connected to databaes and app NOT run");
  console.log(err);
});


// Just to ping!

bot.on('text', msg => {
  if(status.getStatus(msg.chat.id)==1){
    User.exists({chatId:msg.chat.id}).
    then((res)=>{
      if(res){
       return User.exists({userName:msg.text});
      }
      else{
        const newUser=new User({chatId:msg.chat.id,userName:msg.text});
        newUser.save().then(()=>{
          bot.sendMessage(msg.chat.id , lang.yourNewUsername + msg.text );
          status.setStatus(msg.chat.id,0);
        }).catch(((err)=>{
          console.log("in line 53");
          console.log(err)
        }));
        

      }
    }).then((res)=>{
      if(res){
        User.updateOne({chatId:msg.chat.id},{userName:msg.text}).then(()=>{
          bot.sendMessage(msg.chat.id , lang.yourNewUsername + msg.text );
          status.setStatus(msg.chat.id,0);
        }).catch((err)=>{
          console.log("in line 62");
          console.log(err);
        });
      }
      else {
        bot.sendMessage(msg.chat.id,lang.ythisUserNameAlredyExistSendMyAndOder);
      }
    }).catch((err)=>{
      console.log(err);
    });

  }
  
});

bot.onText(/\/start/, (msg) => { 

  User.findOne({chatId:msg.chat.id}).then((res)=>{
    if(res){
      bot.sendMessage(msg.chat.id,lang.selectOption, {
        "reply_markup": {
            "keyboard": [[lang.sendText,lang.sendPic,lang.sendVideo],[lang.changeUsername]]
            }
        });
    }
    else{
      bot.sendMessage(msg.chat.id,lang.wlecome + lang.interUsername);
      status.setStatus(msg.chat.id,1);
    }
  }).catch((err)=>{
    console.log("in start command we have err");
    console.log(err)
  })

});





bot.onText(new RegExp(lang.changeUsername), (msg) => { 
  bot.sendMessage(msg.chat.id,lang.interUsername);
  status.setStatus(msg.chat.id,1);
});

