var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var dbOperations = require("./models/database.js");

var app = express();
var jsonParser = bodyParser.json();

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});
app.get('/db/loginUsers', function(req,res){
    dbOperations.loginUsers(req,res);
});

app.post('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
});
//app.post('/users', jsonParser, function (req, res) {
app.post('/db/addFBRecord', function(req,res){
    dbOperations.addFBRecord(req,res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
