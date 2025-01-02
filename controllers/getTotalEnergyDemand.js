import { rooms } from "../scripts/setRoom.js";

function calculateTotalDemand(rooms) {
  let totalDemand = 0;

  rooms.forEach((room) => {
    const roomConfig = rooms.find((r) => r.name === room.name);

    if (roomConfig) {
      roomConfig.devices.forEach((device) => {
        if (device.status === 'on') {
          totalDemand += device.wattage;
        }
      });
    }
  });

  return totalDemand;
}

export function TotalEnergyDemand (req,res) {
  const totalEnergyDemand = calculateTotalDemand(rooms);
  console.log(totalEnergyDemand);
  if(!totalEnergyDemand){ 
    res.status(404).json({error: 'Data not found'});
  }
  res.status(200).json( totalEnergyDemand );
};