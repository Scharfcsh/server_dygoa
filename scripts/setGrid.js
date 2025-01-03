import { generateDynamicData } from "./arduinoExampleData.js";

const getRandomBuildingWattage = () => {
  return Math.floor(Math.random() * 1000) + 1; // Ensure it returns a value between 1 and 1000
};

export const grids = [
  {
    id: "grid-1",
    name: "Grid 1",
    subgrids: [
      {
        id: "subgrid-1",
        name: "Subgrid 1",
        buildings: [
          {
            id: "building-1",
            type: "building",
            status: "on",
            wattage: getRandomBuildingWattage(),
          },
          {
            id: "building-2",
            type: "building",
            status: "off",
            wattage: getRandomBuildingWattage(),
          },
        ],
      },
    ],
  },
  {
    id: "grid-2",
    name: "Grid 2",
    subgrids: [
      {
        id: "subgrid-2",
        name: "Subgrid 2",
        buildings: [
          {
            id: "building-3",
            type: "building",
            status: "on",
            wattage: getRandomBuildingWattage(),
          },
          {
            id: "building-4",
            type: "building",
            status: "off",
            wattage: getRandomBuildingWattage(),
          },
        ],
      },
    ],
  },
];

export function updateGridStatus(data) {
  data.forEach((gridData) => {
    const grid = grids.find((g) => g.name === gridData.name);
    if (grid) {
      grid.subgrids.forEach((subgrid) => {
        subgrid.buildings.forEach((building) => {
          if (building.type === "building") {
            building.status = gridData.buildingState ? "on" : "off";
          }
        });
      });
    }
  });
}

// setInterval(() => {
//   const dynamicData = generateDynamicData();
//   updateGridStatus(dynamicData);
//   console.log("grid data", Math.random() * 100);
// }, 5000);
