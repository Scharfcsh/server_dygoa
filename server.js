import express from 'express';
import bodyParser from 'body-parser';
import SerialPort from 'serialport';
const Readline = require('@serialport/parser-readline');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Store room data in memory
let roomData = [];

// Set up serial communication with Arduino
const serialPort = new SerialPort('COM3', { baudRate: 9600 }); // Replace 'COM3' with your Arduino's port
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));

// Read data from Arduino and update roomData
parser.on('data', (data) => {
  try {
    console.log("Received from Arduino:", data);

    const updatedRoomData = JSON.parse(data);
    updateRoomStatus(updatedRoomData);   // Update the room data in memory

  } catch (error) {
    console.error("Error parsing Arduino data:", error.message);
  }
});

// REST API to fetch room data
app.get('/api/rooms', (req, res) => {
  res.json(roomData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
