import { grids } from "../scripts/setGrid.js";

function calculateTotalDemand(grids) {
  let totalDemand = 0;

  grids.forEach((grid) => {
    const gridConfig = grids.find((g) => g.name === grid.name);

    if (gridConfig) {
      gridConfig.subgrids.forEach((subgrid) => {
        subgrid.buildings.forEach((building) => {
          if (building.status === "on") {
            totalDemand += building.wattage;
          }
        });
      });
    }
  });

  return totalDemand;
}

export function TotalEnergyDemand(req, res) {
  const totalEnergyDemand = calculateTotalDemand(grids);
  console.log(totalEnergyDemand);
  if (!totalEnergyDemand) {
    res.status(404).json({ error: "Data not found" });
  }
  res.status(200).json(totalEnergyDemand);
}
