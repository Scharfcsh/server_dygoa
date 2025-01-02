import express from "express"
import { getRoomDevices } from "./controllers/getRoomDevices.js";
import cors from "cors";
import Roomrouter from "./routes/room.route.js";
import EnergyRouter from "./routes/energy.routes.js";


const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",

}
app.use(cors(corsOptions));
app.use(express.json());



// Routes
app.use("/api/rooms",Roomrouter); //done
app.use("/api/energy",EnergyRouter ); //done

// Server Setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
