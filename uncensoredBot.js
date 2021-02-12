const config = require("./config/key");
const lang = require("./config/lang");
const status = require('./status');
const TelegramBot = require('node-telegram-bot-api');
const Db=require("./DataBase")
const keyboard= require("./keyboard");


const token = config.token;
const bot = new TelegramBot(token);

const comebackMessage=(chatid,text)=>{
  const k11=new keyboard.KeyboardButton(lang.comeback);
  const replyKeyboardMarkup = new keyboard.ReplyKeyboardMarkup();
  replyKeyboardMarkup.addRow(k11);
  replyKeyboardMarkup.setOne_time_keyboard(true);
  replyKeyboardMarkup.setSelective(true);
  replyKeyboardMarkup.setResize_keyboard(true)
  bot.sendMessage(chatid,text, {"reply_markup":replyKeyboardMarkup.get()});
}


bot.onText(/\/start/, (msg) => { 


  Db.getUserName(msg.chat.id)
  .then((userName)=>{
    bot.sendMessage(msg.chat.id,lang.wlecome+"\n :"+String(userName));
  })
  .catch(()=>{
    Db.createNewUser(msg.chat.id,String(msg.chat.id)).then((user)=>{
      bot.sendMessage(msg.chat.id,lang.wlecome+String(user.userName));
    })
    .catch((err)=>{console.log(err)});
  });
  

});

bot.on("callback_query",(msg)=>{
})

bot.on('message', msg => {
 //status = 1 changeUsername
  if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.changeUsername){
    
    comebackMessage(msg.chat.id,lang.interUsername);
    status.setStatus(msg.chat.id,1);

  }
 
  else if(status.getStatus(msg.chat.id) == 1 && msg.text!=lang.comeback){
    //changeUsername
    if(!msg.text){
      bot.sendMessage(msg.chat.id,lang.plessSendMeText);
      return 0;
    }
    Db.changeUserName(msg.chat.id,msg.text)
    .then(()=>{
        bot.sendMessage(msg.chat.id,msg.text+" "+lang.changeUsernameSusecfull);
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
    })
    .catch(()=>{
      bot.sendMessage(msg.chat.id,lang.thisUserNameAlredyExistSendMyAndOder);
    })

    //


  }
/////////////////////////////////////////////////////////////////////

  
  // lang.sendPic status = 2
  else if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.sendPic){

    comebackMessage(msg.chat.id,lang.sendYourPic);
    status.setStatus(msg.chat.id,2);

  }
  /////////////////////////////////////////////////////////////////
  // sendVideo status = 3
  else if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.sendVideo){
    comebackMessage(msg.chat.id,lang.sendYourVideo);
    status.setStatus(msg.chat.id,3);
  }
  //////////////////////////////////////////////////////////////////
  // sendText status = 4
  else if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.sendText){
    comebackMessage(msg.chat.id,lang.sendYourText);
    status.setStatus(msg.chat.id,4);
  }
//////////////////////////////////////////////////////////////////////////
else if(msg.text==lang.comeback){
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

    status.setStatus(msg.chat.id,0);
  }


});




























const uncensoredBot = {
    processUpdate(param){ 
      bot.processUpdate(param)
    },
    
    token:token
};
module.exports = uncensoredBot;