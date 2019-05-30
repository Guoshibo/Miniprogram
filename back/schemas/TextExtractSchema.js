var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textExtractSchema = new Schema({
    openId:String,
    text:Array,
    createdTime:Number,
});

module.exports = textExtractSchema;