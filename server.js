import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import dotenv from "dotenv";
import Grid from "./models/Grid.js";
import GridRouter from "./routes/grid.route.js";
import EnergyRouter from "./routes/energy.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});
const sectors = [
  { name: "Sector1", value: 2, active: false },
  { name: "Sector2", value: 3, active: false },
  { name: "Sector3", value: 4, active: true },
  { name: "Sector4", value: 8, active: false },
  { name: "Sector5", value: 9, active: true },
  { name: "Sector6", value: 10, active: false },
];

function sendInitialData() {
  const dataString = JSON.stringify(sectors);
  port.write(dataString + '\n', (err) => {
    if (err) {
      console.error('Error sending data:', err.message);
    } else {
      console.log('Initial data sent:', dataString);
    }
  });
}
// Store grid data in memory
let gridData = [];

// Set up serial communication with Arduino
const serialPort = new SerialPort({ path: "COM9", baudRate: 9600 }); // Replace 'COM3' with your Arduino's port
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on('data', (data) => {
  console.log('Updated data received:', data);
  try {
    const updatedSectors = JSON.parse(data);
    console.log('Updated Sectors:', updatedSectors);
  } catch (err) {
    console.error('Error parsing data:', err.message);
  }
});

// Send data on port open
parser.on('open', () => {
  console.log('Serial port open');
  sendInitialData();
});

parser.on('error', (err) => {
  console.error('Serial port error:', err.message);
});

// REST API to fetch grid data
app.use("/api/grids", GridRouter); //done
app.use("/api/energy", EnergyRouter); //done

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
