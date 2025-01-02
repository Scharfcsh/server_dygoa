import { generateDynamicData } from "./arduinoExampleData.js";


export const rooms = [
    {
      id: "living-room",
      name: "Living Room",
    //   lightsOn: 3,
    //   totalLights: 5,
      devices: [
        { id: "light-1", type: "light", status: "on", wattage: 20 },
        { id: "fan-1", type: "fan", status: "on", wattage: 60 }
      ]
    },
    {
      id: "bedroom",
      name: "Bedroom",
    //   lightsOn: 2,
    //   totalLights: 3,
      devices: [
        { id: "light-1", type: "light", status: "on", wattage: 20 },
        { id: "fan-1", type: "fan", status: "off", wattage: 60 }
      ]
    },
    {
      id: "kitchen",
      name: "Kitchen",
    //   lightsOn: 4,
    //   totalLights: 6,
      devices: [
        { id: "light-1", type: "light", status: "on", wattage: 20 },
        { id: "fan-1", type: "fan", status: "on", wattage: 60 }
      ]
    }
  ];
  

export function updateRoomStatus(data) {
    data.forEach(roomData => {
        const room = rooms.find(r => r.name === roomData.name);
        if (room) {
            room.devices.forEach(device => {
                if (device.type === 'light') {
                    device.status = roomData.lightState ? 'on' : 'off';
                } else if (device.type === 'fan') {
                    device.status = roomData.fanState ? 'on' : 'off';
                }
            });
        }
    });
}

// setInterval( () => {
//     const dynamicData =  generateDynamicData();
//     updateRoomStatus(dynamicData);
//     console.log("room data" ,Math.random()*100);
// }, 5000);
