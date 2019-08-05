const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.json());
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})
app.get("/goods",function (req,res) {
    fs.readFile(__dirname+"/goods.json",function (err,results) {
        const goodsList = JSON.parse(results);
        res.json({
            goodsList
        })
    })
})

app.listen(80,function () {
    console.log("succcess");
})