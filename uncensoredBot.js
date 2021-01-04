const config = require("./config/key");
const lang = require("./config/lang");
const TelegramBot = require('node-telegram-bot-api');

const keyboard= require("./keyboard")

const token = config.token;
const bot = new TelegramBot(token);


bot.onText(/\/start/, (msg) => { 
  
  const k11=new keyboard.KeyboardButton(lang.sendText);
  const k12=new keyboard.KeyboardButton(lang.sendPic);
  const k13=new keyboard.KeyboardButton(lang.sendVideo);

  const k21=new keyboard.KeyboardButton(lang.changeUsername);

  const replyKeyboardMarkup = new keyboard.ReplyKeyboardMarkup();
  replyKeyboardMarkup.addRow(k11,k12,k13);
  replyKeyboardMarkup.addRow(k21);
  replyKeyboardMarkup.setOne_time_keyboard(true);
  replyKeyboardMarkup.setSelective(true);
  replyKeyboardMarkup.setResize_keyboard(true)

  bot.sendMessage(msg.chat.id,lang.wlecome + lang.selectOption, {
    "reply_markup": replyKeyboardMarkup.get()
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