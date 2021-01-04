const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
app.use(express.json());


//processUpdateUncensoredBot
const uncensoredBot = require("./uncensoredBot");
app.post(`/bot${uncensoredBot.token}`, (req, res) => {
    uncensordBot. processUpdate(req.body);
    res.sendStatus(200);
});

const server={
    start(){
        // Start Express Server
        app.listen( port , () => {
        console.log(`Express server is listening on ${port}`);
        });
    }
}

module.exports = server;
