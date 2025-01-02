import { set } from "mongoose";
import {rooms} from "./setRoom.js"; 


export function generateDynamicData() {
  const dynamicData = rooms.map((room, index) => {
    return {
      name: room.name,
      lightState: Math.random() < 0.5, // Randomly setting light state (true or false)
      fanState: Math.random() < 0.5,   // Randomly setting fan state (true or false)
    };
  });
  
  return dynamicData;
}
// setInterval(() => {
//     console.log(generateDynamicData());
// }, 5000);

