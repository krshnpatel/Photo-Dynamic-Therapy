/**
 * Created by madalitsomchaina on 2017-11-18.
 */

var SerialPort = require("serialport")
var serialport = new SerialPort("/dev/tty.usbmodem1411", {
    baudRate: 9600
});




serialport.on('open', function(){
    console.log('Serial Port Open');

});

serialport.on('data', function(data){
    console.log(data[0]);
    var num = 622;
    var buffer = new ArrayBuffer(4);
    var longNum = new Float32Array(buffer);
    longNum[0] = num;
    serialport.write(new Buffer([0xEE]));
    var arr = Array.from(new Int8Array(buffer));
    console.log(arr);
    serialport.write(arr);
    //serialport.write(Array.from(new Int8Array(buffer)).reverse());
});
