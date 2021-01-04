const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
app.use(express.json());


//processUpdateUncensordBot
app.post(`/bot${token}`, (req, res) => {
    const processUpdateUncensordBot = require("./uncensordBot");
    processUpdateUncensordBot(req.body);
    
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
