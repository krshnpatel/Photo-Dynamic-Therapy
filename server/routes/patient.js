var express = require('express');
var router = express.Router();
var patient = require('../models/patient');

router.route('/')
    .get((request, response) => {
        patient.find((error, patients) => {
            if (error)
                response.send(error);
            response.send(patients);
        });
    });

router.route('/add')
    .post((request, response) => {
        var newPatient = new patient(request.body);
        newPatient.save((error) => {
            if (error) response.send(error);
            response.send(newPatient);
        });
    });

module.exports = router;