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
bot.setWebHook(`${url}/bot${TOKEN}`);
bot.sendMessage("196207259",bot.getMe());
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

// Just to ping!
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});
