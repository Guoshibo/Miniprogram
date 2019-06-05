const mongoose = require('mongoose');
//连接数据库 weChatApp
const config = require('./config');
mongoose.connect(config.mongodb,{useNewUrlParser:true});
module.exports = mongoose;
 

