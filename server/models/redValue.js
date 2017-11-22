var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var redValueSchema = mongoose.Schema(
    {
        value: Number,
        previous: Number
    }
);

module.exports = mongoose.model('redValue', redValueSchema)