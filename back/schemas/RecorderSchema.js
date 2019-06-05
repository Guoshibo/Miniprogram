var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RecorderSchema = new Schema({
    openId:String,
    content:String,
    createdTime:Number
});

module.exports = RecorderSchema;