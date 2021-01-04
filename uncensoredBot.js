const config = require("./config/key");
const lang = require("./config/lang");
const TelegramBot = require('node-telegram-bot-api');

const token = config.token;
const bot = new TelegramBot(token);


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

const uncensoredBot = {
    processUpdate(param){ 
      bot.processUpdate(param)
    },
    
    token:token
};
module.exports = uncensoredBot;