const server=require("./server");
const Db = require('./DataBase');
const uri = require("./config/key").dataBaseUrl;
const  Db  = require("./model/User");

Db.connect(uri)
.then(()=>{server.start()})
.catch(console.log("db not connect"));

