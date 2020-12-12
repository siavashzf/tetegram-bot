const token = require("./config/key").token;


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
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});



bot.on('text', msg => {
  
});

bot.onText(/\/start/, (msg) => { 
  bot.sendMessage(msg.chat.id,"test inline query", {
    "reply_markup": {
        "inline_keyboard": [[{text:'salam',callback_data:"A_query"}]]
        }
    });
});

