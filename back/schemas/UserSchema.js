var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    openid:String,
    session_key:String
});
module.exports = userSchema;