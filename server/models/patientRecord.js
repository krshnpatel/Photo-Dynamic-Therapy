var mongoose = require('mongoose');
var patientRecordSchema = mongoose.Schema(
    {
        melanin: Number,
        age: Number,
        sex: String,
        optimalWavelength: Number,
        trialNo: {type: Number, default: 0},
        trials: [{
            trialNumber: Number,
            redValue: Number,
            redReduced: Number,
            wavelength: Number
        }]
    }
);

module.exports = mongoose.model('patientRecord', patientRecordSchema)