import { grids } from "./setGrid.js";

export function generateDynamicData() {
  const dynamicData = grids.map((grid, index) => {
    return {
      name: grid.name,
      lightState: Math.random() < 0.5, // Randomly setting light state (true or false)
      fanState: Math.random() < 0.5, // Randomly setting fan state (true or false)
    };
  });

  return dynamicData;
}
// setInterval(() => {
//     console.log(generateDynamicData());
// }, 5000);
