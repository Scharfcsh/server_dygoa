import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline"; // Remove this line if not used
import dotenv from "dotenv";
// import Grid from "./models/Grid.js"; // Remove this line if not used
import GridRouter from "./routes/grid.route.js";
import EnergyRouter from "./routes/energy.routes.js";
import cors from "cors";
import { analyseGrid } from "./controllers/GridLogic.js";
import { getProductionFromDB } from "./controllers/gridController.js";

dotenv.config();

const app = express();
const serverPort = 3001;

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

let activeData = 0;

const serialPort = new SerialPort({ path: "COM9", baudRate: 9600 }); // Replace with your Arduino's port
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));
parser.on('data', async (data) => {
  console.log(`Received from Arduino: ${data}`);

  // Parse the potentiometer value
  const potValue = parseInt(data, 10);

  if (isNaN(potValue)) {
    console.error('Error: Invalid potentiometer value received.');
    return;
  }
  await getProductionFromDB(potValue*2);
  const parsedData = await analyseGrid(potValue);
 
  // Send LED states to Arduino
  serialPort.write(`${parsedData}\n`, (err) => {
    if (err) {
      console.error('Error writing to serial port:', err.message);
    } else {
      console.log(`Sent to Arduino: ${parsedData}`);
    }
  });
  console.log(`Potentiometer set  value: ${parsedData}`);
});

// Handle errors
serialPort.on('error', (err) => {
  console.error('Error: ', err.message);
});
app.use("/api/grids", GridRouter); //done
app.use("/api/energy", EnergyRouter); //done


// Start the server
app.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  
});


