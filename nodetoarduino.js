var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/tty.wchusbserialfa1410',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});

app.listen(3000);



// const { SerialPort } = require('serialport');

// const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 }); // Replace with your Arduino's serial port

// // Function to control the LED
// const controlLED = (state) => {
//     const command = state ? '1' : '0';
//     port.write(command, (err) => {
//         if (err) {
//             return console.error('Error sending data:', err.message);
//         }
//         console.log(`LED turned ${state ? 'ON' : 'OFF'}`);
//     });
// };

// // Example usage
// setTimeout(() => controlLED(true), 1000); // Turn LED ON after 1 second
// setTimeout(() => controlLED(false), 3000); // Turn LED OFF after 3 seconds
