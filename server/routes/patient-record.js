var express = require('express');
var router = express.Router();
var patientRecord = require('../models/patientRecord');

router.route('/')
    .get((request, response) => {
        patientRecord.find((error, patientRecords) => {
            if (error)
                response.send(error);
            response.send(patientRecords);
        });
    });

router.route('/:_id')
    .get((request, response) => {
        patientRecord.findById(request.params._id, (error, onePatientRecord) => {
            if (error)
                response.send(error);
            response.send(onePatientRecord);
        });
    })
    .put((request, response) => {
        patientRecord.findById(request.params._id, request.body, (error, onePatientRecord) => {
            if (error)
                response.send(error);
            response.send(onePatientRecord);
        });
    });

router.route('/add')
    .post((request, response) => {
        var newPatientRecord = new patientRecord(request.body);
        newPatientRecord.save((error) => {
            if (error) response.send(error);
            response.send(newPatientRecord);
        });
    });

module.exports = router;