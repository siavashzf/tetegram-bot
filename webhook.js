/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN =  '1431997595:AAEzLI8bXQiZX-JHC6ESy4LHmQf2yTgOzDc' || process.env.TELEGRAM_TOKEN ;
const url = 'https://siavash-telegram-bot.herokuapp.com';
const port = process.env.PORT;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
//bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
let state=0;
// Just to ping!




bot.on('message', msg => {
    if (state==0){
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://siavash:Si@7257482@cluster0.oth6f.mongodb.net/telegram_bot?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
        
            let myobj = { name: "Company Inc", address: "Highway 37" };
            const collection = client.db("telegram_bot").collection("user").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
              });
          // perform actions on the collection object
            client.close();
        });
            
    bot.sendMessage(msg.chat.id, "ok addd");
    state=1;
    }
    else{
        bot.sendMessage(msg.chat.id, "1");
    state=0;
    }
  bot.sendMessage(msg.chat.id, msg.text);
});
