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

// Store grid data in memory
let gridData = [];

// Set up serial communication with Arduino
const serialPort = new SerialPort({ path: "COM9", baudRate: 9600 }); // Replace 'COM3' with your Arduino's port
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

serialPort.on("error", (err) => {
  console.error("Error opening serial port:", err.message);
});

// Read data from Arduino and update gridData
parser.on("data", async (data) => {
  try {
    if (data.includes("Error")) {
      return;
    }
    console.log("Received from Arduino:", data);

    // const updatedGridData = JSON.parse(data);
    // updateGridStatus(updatedGridData); // Update the grid data in memory

    // // Save the updated data to MongoDB
    // const grid = new Grid(updatedGridData);
    // await grid.save();
  } catch (error) {
    console.error("Error parsing Arduino data:", error.message);
  }
});

// REST API to fetch grid data
app.use("/api/grids", GridRouter); //done
app.use("/api/energy", EnergyRouter); //done

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Building data from Arduino:

// [{ "name": "Sector1", "demand": 255, "ledState": true },
// { "name": "Sector2", "demand": 255, "ledState": true },
// { "name": "Sector3", "demand": 190, "ledState": true },
// { "name": "Sector4", "demand": 151, "ledState": true },
// { "name": "Sector5", "demand": 109, "ledState": false },
// { "name": "Sector6", "demand": 85, "ledState": false }]
