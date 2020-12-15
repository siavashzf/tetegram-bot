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
 
  const data = msg.data.split(" ");
  
  if(data[0]=='allowedMessage'){
    bot.editMessageText("allowedMessage",{
      chat_id:msg.from.id,
      message_id:msg.message.message_id
    });
    console.log(data[1]);
    bot.forwardMessage("@mafia00703",msg.from.id,Number(data[1]));
  //send to chanel
  }
  if(data[0]=='rejectMessage'){
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

    bot.forwardMessage(config.adminChatId,msg.chat.id,msg.message_id)
    bot.sendMessage(config.adminChatId,"reject or  allowed", {
      "reply_markup": {
          "inline_keyboard": [[{text:lang.allowedMessage ,callback_data:"allowedMessage"+String(msg.message_id)},
                                {text:lang.rejectMessage,callback_data:"rejectMessage"+String(msg.message_id)}]]
          }
      });
      bot.sendMessage(msg.chat.id,"send to admin for taiid");
});