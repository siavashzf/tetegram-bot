const config = require("./config/key");
const lang = require("./config/lang");
const status = require('./status');
const TelegramBot = require('node-telegram-bot-api');
const Db=require("./DataBase")
const keyboard= require("./keyboard");
const uuid=require('uuid');

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

const homePage=(chatid)=>{
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

  bot.sendMessage(chatid,lang.selectOption, {
    "reply_markup": replyKeyboardMarkup.get()
    });
}

bot.onText(/\/start/, (msg) => { 
  Db.getUserName(msg.chat.id)
  .then((userName)=>{
    bot.sendMessage(msg.chat.id,lang.wlecome+" "+String(userName));
    homePage(msg.chat.id);
  })
  .catch(()=>{
    let str=msg.from.first_name+String(msg.chat.id);
    Db.createNewUser(msg.chat.id,str)
    .then((user)=>{
      bot.sendMessage(msg.chat.id,lang.wlecome + str);
      homePage(msg.chat.id);
    })
    .catch((err)=>{console.log(err)});
  });
});

bot.on("callback_query",(msg)=>{
  let data = msg.data.split(" ");

  if(data[0]=== "allowed"){
    bot.copyMessage(config.chanelUsername,msg.from.id,msg.message.message_id);
    bot.answerCallbackQuery({callback_query_id:msg.id,show_alert:"true"});
    bot.deleteMessage(msg.from.id,msg.message.message_id);
    bot.sendMessage(Number(data[1]),lang.yourMessageSendToChanel)
  }
 else{
    bot.answerCallbackQuery({callback_query_id:msg.id,show_alert:"true"});
    bot.deleteMessage(msg.from.id,msg.message.message_id);
    bot.sendMessage(Number(data[1]),lang.yourMessageDontSendToChanel)
 }

  
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
        bot.sendMessage(msg.chat.id,lang.changeUsernameSusecfull+"\n"+msg.text);
        status.setStatus(msg.chat.id,0) ;
        homePage(msg.chat.id);
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
  else if(status.getStatus(msg.chat.id) == 2 && msg.text!=lang.comeback){
    if (msg.photo){
      const k11=new keyboard.InlineKeyboardButton(lang.allowedMessage,"allowed " + String(msg.chat.id) );
      const k12=new keyboard.InlineKeyboardButton(lang.rejectMessage,"reject " + String(msg.chat.id) );
      const  InlineKeyboardMarkup= new keyboard.InlineKeyboardMarkup();  
      InlineKeyboardMarkup.addRow(k11,k12)

      Db.getUserName(msg.chat.id).then(userName=>{
        let str;
        if(msg.caption){
          str ='\n'+String(msg.caption);
        }
         str+='-| '+userName+" |-\n"+config.chanelUsername;
        bot.sendPhoto(require("./config/key").adminsChatId[0],msg.photo[0].file_id,{
          caption:str,
          "reply_markup": InlineKeyboardMarkup.get()
          });

        bot.sendMessage(msg.chat.id,lang.afterAceept);

        homePage(msg.chat.id);
      })
    }
    status.setStatus(msg.chat.id,0);
  }
  
  /////////////////////////////////////////////////////////////////
  // sendVideo status = 3
  else if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.sendVideo){
    comebackMessage(msg.chat.id,lang.sendYourVideo);
    status.setStatus(msg.chat.id,3);
  }
  else if(status.getStatus(msg.chat.id) == 3 && msg.text!=lang.comeback){
    if (msg.video){
      const k11=new keyboard.InlineKeyboardButton(lang.allowedMessage,"allowed " + String(msg.chat.id) );
      const k12=new keyboard.InlineKeyboardButton(lang.rejectMessage,"reject " + String(msg.chat.id) );
      const  InlineKeyboardMarkup= new keyboard.InlineKeyboardMarkup();  
      InlineKeyboardMarkup.addRow(k11,k12)
      Db.getUserName(msg.chat.id).then(userName=>{
        let str;
        if(msg.caption!=undefined){
          str =String(msg.caption)+ "\n";
        }
         str+='-| '+userName+" |-\n"+config.chanelUsername;
        bot.sendVideo(require("./config/key").adminsChatId[0],msg.video.file_id,{
          caption:str,
          "reply_markup": InlineKeyboardMarkup.get()
          });

        bot.sendMessage(msg.chat.id,lang.afterAceept);

        homePage(msg.chat.id);
      })
    }
    status.setStatus(msg.chat.id,0);
  }
  //////////////////////////////////////////////////////////////////
  // sendText status = 4
  else if(status.getStatus(msg.chat.id) == 0 && msg.text==lang.sendText){
    comebackMessage(msg.chat.id,lang.sendYourText);
    status.setStatus(msg.chat.id,4);
  }
  else if(status.getStatus(msg.chat.id) == 4 && msg.text!=lang.comeback){
    if(msg.text){
      const k11=new keyboard.InlineKeyboardButton(lang.allowedMessage,"allowed " + String(msg.chat.id) );
      const k12=new keyboard.InlineKeyboardButton(lang.rejectMessage,"reject " + String(msg.chat.id) );
      const  InlineKeyboardMarkup= new keyboard.InlineKeyboardMarkup();  
      InlineKeyboardMarkup.addRow(k11,k12);

      Db.getUserName(msg.chat.id).then(userName=>{
        let str=msg.text+'\n-| '+userName+" |-\n"+config.chanelUsername;
        bot.sendMessage(require("./config/key").adminsChatId[0],str,{
          "reply_markup": InlineKeyboardMarkup.get()
          });
        bot.sendMessage(msg.chat.id,lang.afterAceept);
        homePage(msg.chat.id);
      })
    }
    status.setStatus(msg.chat.id,0);
  }
//////////////////////////////////////////////////////////////////////////
else if(msg.text==lang.comeback){
    homePage(msg.chat.id);
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