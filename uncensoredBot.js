const config = require("./config/key");
const lang = require("./config/lang");
const status = require('./status');
const TelegramBot = require('node-telegram-bot-api');

const keyboard= require("./keyboard")

const token = config.token;
const bot = new TelegramBot(token);


bot.onText(/\/start/, (msg) => { 


  //if new user do this
  bot.sendMessage(msg.chat.id,lang.interUsernam);
  status.setStatus(msg.chat.id,1);

  // const k11=new keyboard.KeyboardButton(lang.sendText);
  // const k12=new keyboard.KeyboardButton(lang.sendPic);
  // const k13=new keyboard.KeyboardButton(lang.sendVideo);
  // const k21=new keyboard.KeyboardButton(lang.changeUsername);
  // const replyKeyboardMarkup = new keyboard.ReplyKeyboardMarkup();
  // replyKeyboardMarkup.addRow(k11,k12,k13);
  // replyKeyboardMarkup.addRow(k21);
  // replyKeyboardMarkup.setOne_time_keyboard(true);
  // replyKeyboardMarkup.setSelective(true);
  // replyKeyboardMarkup.setResize_keyboard(true)

  // bot.sendMessage(msg.chat.id,lang.selectOption, {
  //   "reply_markup": replyKeyboardMarkup.get()
  //   });

});

bot.on("callback_query",(msg)=>{
})

bot.on('message', msg => {

  if(status.getStatus(msg.chat.id)==1){
    //changeUsername

    //changeUsername code

    //

    bot.sendMessage(msg.chat.id,lang.changeUsernameSusecfull);
    status.setStatus(msg.chat.id,0)

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
  
    bot.sendMessage(msg.chat.id,lang.selectOption, {
      "reply_markup": replyKeyboardMarkup.get()
      });
  }

  


});



const uncensoredBot = {
    processUpdate(param){ 
      bot.processUpdate(param)
    },
    
    token:token
};
module.exports = uncensoredBot;