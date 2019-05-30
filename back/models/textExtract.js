var mongoose = require('mongoose');
var TextExtractSchema = require('../schemas/TextExtractSchema');
var Textextract = mongoose.model('textextract',TextExtractSchema);
module.exports = Textextract;