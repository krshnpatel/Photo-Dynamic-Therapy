var express = require('express');
var router = express.Router();
var patient = require('../models/patient');
var redValue = require('../models/redValue');

router.route('/')
    .get((request, response) => {
        patient.find((error, patients) => {
            if (error)
                response.send(error);
            response.send(patients);
        });
    });

router.route('/:_id')
    .get((request, response) => {
        patient.findById(request.params._id, (error, onePatient) => {
            if (error)
                response.send(error);
            response.send(onePatient);
        });
    })

router.route('/add')
    .post((request, response) => {
        var newPatient = new patient(request.body);
        newPatient.save((error) => {
            if (error) response.send(error);
            response.send(newPatient);
        });
    });

router.route('/redValue')
    .put((request, response) => {
        redValue.findOneAndUpdate({ _id: "5a115b5e030a172c50efa5ce" }, request.body, (err, place) => {
            response.send(place);
        });
    })
    .get((request, response) => {
        redValue.find((error, redValues) => {
            if (error)
                response.send(error);
            response.send(redValues);
        });
    });

module.exports = router;