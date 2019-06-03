var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');

var mongoose = require('./config/mongoose.js');
var db = mongoose();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/weChatApp', indexRouter);

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
//post请求解析
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next) {
  // 拿取token 数据 按照自己传递方式写
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {      
      // 解码 token (验证 secret 和检查有效期（exp）)
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
          return res.json({ success: false, message: '无效的token.' });    
            } else {
              // 如果验证通过，在req中写入解密结果
              req.decoded = decoded;  
              //console.log(decoded)  ;
              next(); //继续下一步路由
        }
      });
    } else {
      // 没有拿到token 返回错误 
      return res.status(403).send({ 
          success: false, 
          message: '没有找到token.' 
      });
    }
  });



module.exports = app;
