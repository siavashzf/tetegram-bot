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
  bot.sendMessage(msg.chat.id,"test inline query", {
    "reply_markup": {
        "inline_keyboard": [[{text:lang.allowedMessage ,callback_data:"query_allowedMessage"},
                              {text:lang.rejectMessage,callback_data:"query_rejectMessage"}]]
        }
    });
});

bot.on("callback_query",(msg)=>{
 
  
  if(msg.data=='query_allowedMessage'){
    
    bot.deleteMessage(msg.from.id,msg.message.message_id);
    bot.editMessageText("masagee allowed",{
      chat_id:msg.from.id,
      message_id:msg.message.message_id
    });
  //send to chanel
  }
  if(msg.data=='query_rejectMessage'){
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
          "inline_keyboard": [[{text:lang.allowedMessage ,callback_data:"query_allowedMessage"},
                                {text:lang.rejectMessage,callback_data:"query_rejectMessage"}]]
          }
      });
      bot.sendMessage(msg.chat.id,"send to admin for taiid");
});