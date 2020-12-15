const config = require("./config/key");
const token = config.token;
const lang = require("./config/lang");
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');


const port = process.env.PORT || 8080;
const bot = new TelegramBot(token);

const app = express();
app.use(express.json());



app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen( port , () => {
  console.log(`Express server is listening on ${port}`);
});


bot.onText(/\/start/, (msg) => { 
  console.log(String(msg.message_id));
  bot.sendMessage(msg.chat.id,"test inline query", {
    "reply_markup": {
        "inline_keyboard": [[{text:lang.allowedMessage ,callback_data:"allowedMessage "+String(msg.message_id)},
                              {text:lang.rejectMessage,callback_data:"rejectMessage"+String(msg.message_id)}]]
        }
    });
});

bot.on("callback_query",(msg)=>{
 
  bot.copyMessage();
  

  if(msg.data=='allowedMessage'){
    bot.editMessageText("allowedMessage",{
      chat_id:msg.from.id,
      message_id:msg.message.message_id
    });
    
    
  //send to chanel
  }
  if(msg.data=='rejectMessage'){
    bot.editMessageText("rejectedMessage",{
      chat_id:msg.from.id,
      message_id:msg.message.message_id
    });

    //delet msg
  }
  
})

bot.on('text', msg => {
  let a=1;
});


bot.on('message', msg => {

    
    bot.copyMessage(config.adminChatId,msg.chat.id,msg.message_id);
    let a = "allowedMessage";
    let b = "rejectMessage";

    
    bot.sendMessage(config.adminChatId,"reject or  allowed", {
      "reply_markup": {
          "inline_keyboard": [[{text:lang.allowedMessage ,callback_data:a},
                                {text:lang.rejectMessage,callback_data:b}]]
          }
      });
      bot.sendMessage(msg.chat.id,"send to admin for taiid");

      
});
