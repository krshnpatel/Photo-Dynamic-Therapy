var mongoose = require('mongoose');
mongoose.connect('mongodb://main:main@ds113636.mlab.com:13636/photo-dynamic-therapy');

var previousValue;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer({ dest: 'images/' });
var fs = require('fs');

var spawn = require("child_process").spawn;
var https = require('https');

var SerialPort = require('serialport');
var serialport = new SerialPort("COM4", {
  baudRate: 9600
});

serialport.on('open', function () {
  console.log('Serial Port Open');

});

serialport.on('data', function (data) { });

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

app.post('/image', upload.single('image'), function (req, res, next) {
  var tmp_path = req.file.path;

  var target_path = 'images/' + req.file.originalname;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function () {

    fs.unlinkSync(tmp_path);

    res.send("./" + target_path);
  });
  src.on('error', function (err) {
    res.send('error');
  });
});

app.get('/processImage', (request, response, next) => {
  serialport.write(new Buffer([0xFE]));
  console.log(request.query.imagePath);
  var process = spawn('python', ["./python_scripts/process-image.py", request.query.imagePath]);
  process.stdout.on('data', function (data) {
    var redValue = parseInt(data[0].toString());
    console.log(redValue);

    var num = 618;
    var buffer = new ArrayBuffer(4);
    var longNum = new Float32Array(buffer);
    longNum[0] = num;
    serialport.write(new Buffer([0xEE]));
    var arr = Array.from(new Int8Array(buffer));
    serialport.write(arr);

    response.send({ "redValue": redValue });
    // https.request({ url: "http://localhost:8000/patient/redValue", method: 'PUT', json: { _id: "5a115b5e030a172c50efa5ce", value: redValue } }, function (response) {
    //   res.on('data', (d) => {
    //     process.stdout.write(d);
    //   });
    // });
  });
});

app.get('/calculateWavelength', (request, response, next) => {
  var process = spawn('python', ["./python_scripts/calculate-wavelength.py", request.query.redValue]);
  process.stdout.on('data', function (data) {
    var num = data.toString();
    var buffer = new ArrayBuffer(4);
    var longNum = new Float32Array(buffer);
    longNum[0] = num;
    serialport.write(new Buffer([0xEE]));
    var arr = Array.from(new Int8Array(buffer));
    serialport.write(arr);
    response.send({ "optimalWavelength": num });
  });
});

app.get('/blueLight', (request, response, next) => {
  serialport.write(new Buffer([0xFF]));
  response.send("blue light on");
});

app.get('/stopTherapy', (request, response, next) => {
  serialport.write(new Buffer([0xED]));
  response.send("stopping therapy");
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});