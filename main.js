
const token = require("./config/key").token;
const dataBaseUrl = require("./config/key").dataBaseUrl; 

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
const express = require('express');


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
  bot.sendMessage(msg.chat.id, msg.text);
});
