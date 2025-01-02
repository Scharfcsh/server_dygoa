import { rooms } from "../scripts/setRoom.js";

export const getRoomDevices = (req, res) => {
    const room = rooms.find((r) => r.id === req.params.roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room.devices);
};