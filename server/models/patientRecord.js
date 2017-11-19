var mongoose = require('mongoose');
var patientRecordSchema = mongoose.Schema(
    {
        melanin: Number,
        age: Number,
        sex: String,
        optimalWavelength: Number
    }
);

module.exports = mongoose.model('patientRecord', patientRecordSchema)