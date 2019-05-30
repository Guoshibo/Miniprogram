var mongoose = require('mongoose');
var RecorderSchema = require('../schemas/RecorderSchema');
var Recorder = mongoose.model('recorder',RecorderSchema);
module.exports = Recorder;