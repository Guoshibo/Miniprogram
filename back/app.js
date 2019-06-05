var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')

var mongoose = require('./config/mongoose.js');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('success');
});

var app = express();

app.use(logger('dev'));
//post请求解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

var indexRouter = require('./routes/index');
app.use('/weChatApp', indexRouter);

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

module.exports = app;
