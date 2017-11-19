var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        patientRecord: [{ type: Schema.Types.ObjectId, ref: 'patientRecord' }]
    }
);

module.exports = mongoose.model('patient', patientSchema)