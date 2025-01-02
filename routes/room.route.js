import express from 'express';
import { rooms } from "../scripts/setRoom.js";

const Roomrouter = express.Router();


Roomrouter.get("/details", (req,res)=>{
    res.status(200).send(rooms);
});
// Roomrouter.post("/api/rooms/:roomId/update", updateRoomState);
// Roomrouter.get("/api/rooms/:roomId/devices", getRoomDevices);
// Roomrouter.post("/api/rooms/:roomId/devices/:deviceId/update", updateDeviceState);


export default Roomrouter;