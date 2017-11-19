// const path = require('path')
// const getColors = require('get-image-colors')
 
// getColors('./resources/two-red-pixels.jpg').then(colors => {
//   console.log(colors);
// })

var mongoose   = require('mongoose');
mongoose.connect('mongodb://main:main@ds113636.mlab.com:13636/photo-dynamic-therapy');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var patientRecordRoute = require('./routes/patient-record');
var patientRoute = require('./routes/patient');

app.use(function (request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use('/patientRecord', patientRecordRoute);
app.use('/patient', patientRoute);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});