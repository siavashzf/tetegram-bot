
const token = require("./config/key").token;
const dataBaseUrl = require("./config/key").dataBaseUrl; 

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
const express = require('express');
const status = require("./status")

const port = process.env.PORT || 8080;


// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(token);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!

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

bot.on('message', msg => {
  if(status.getStatus(msg.chat.id)==1){
    bot.sendMessage(msg.chat.id,"inter username");
    status.setStatus(msg.chat.id,2);
  }
  if(status.getStatus(msg.chat.id)==2){
    bot.sendMessage(msg.chat.id,"username saveg");
    status.setStatus(msg.chat.id,0);
  }
  
});

bot.onText(/\/start/, (msg) => { 
  bot.sendMessage(msg.chat.id, "یک گزینه را انتخاب کنید", {
  "reply_markup": {
      "keyboard": [["💬ارسال پیام💬 ", "🖼ارسال تصویر🖼","🎥ارسال فیلم🎥"],   ["✏️تغییر نام کاربری"]]
      }
  });
      
});
bot.onText(/✏️تغییر نام کاربری/, (msg) => { 
  bot.sendMessage(msg.chat.id,"selected");
  status.setStatus(msg.chat.id,1);
      
});

