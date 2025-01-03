import { grids } from "../scripts/setGrid.js";
import Grid from "../models/Grid.js";
import Subgrid from "../models/SubGrid.js";
import Building from "../models/Building.js";

const calculateTotalWattage = (subgrid) => {
  return subgrid.buildings.reduce(
    (total, building) => total + building.wattage,
    0
  );
};

export const getGridSubgrids = (req, res) => {
  const grid = grids.find((g) => g.id === req.params.gridId);
  if (!grid) return res.status(404).json({ error: "Grid not found" });
  const subgridsWithWattage = grid.subgrids.map((subgrid) => ({
    ...subgrid,
    totalWattage: calculateTotalWattage(subgrid),
  }));
  res.json(subgridsWithWattage);
};

const getRandomBuildingWattage = () => {
  return Math.floor(Math.random() * 1000) + 1; // Ensure it returns a value between 1 and 1000
};
const getRandomBuildingPriority = () => {
  return Math.floor(Math.random() * 3) + 1; // Ensure it returns a value between 1 and 1000
};

export const getGrid = async (req, res) => {
  try {
    const building1 = new Building({
      name: "Building 1",
      priority: getRandomBuildingPriority(),
      wattage: getRandomBuildingWattage(),
      status: true,
    });
    await building1.save();
    const building2 = new Building({
      name: "Building 2",
      priority: getRandomBuildingPriority(),
      wattage: getRandomBuildingWattage(),
      status: true,
    });
    await building2.save();

    const subgrid1 = new Subgrid({
      name: "Subgrid 1",
      buildings: [building1, building2],
    });
    await subgrid1.save();

    const grid1 = new Grid({
      name: "Grid 1",
      subgrids: [subgrid1],
    });
    await grid1.save();

    const gridWithWattage = {
      ...grid1.toObject(),
      subgrids: grid1.subgrids.map((subgrid) => ({
        ...subgrid.toObject(),
        totalWattage: calculateTotalWattage(subgrid),
      })),
    };

    res.status(200).json(gridWithWattage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
