const path = require('path')
const getColors = require('get-image-colors')
 
getColors('./resources/two-red-pixels.jpg').then(colors => {
  console.log(colors);
})

// var watson = require('watson-developer-cloud');
// var fs = require('fs');

// var visual_recognition = watson.visual_recognition({
//   api_key: '8d7aced8efa9ce11cca985d203dce5989cc20148',
//   version: 'v3',
//   version_date: '2016-05-20'
// });

// var file_name = 'checkered-red.jpg';

// var params = {
//   images_file: fs.createReadStream('./resources/' + file_name)
// };

// visual_recognition.classify(params, function(err, res) {
//   if (err)
//     console.log(err);
//   else
//     console.log(JSON.stringify(res, null, 2));
// });

// var express = require('express')
// var app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(8000, function () {
//   console.log('Example app listening on port 8000!')
// })