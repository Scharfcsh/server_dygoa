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

const calculateTotalWattageGrid = (grid) => {
  return grid.subgrids.reduce(
    (total, subgrid) => total + calculateTotalWattage(subgrid),
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

export let GridDataToArduino ={};
// Randomly generate a grid with buildings and subgrids
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
      totalWattage: calculateTotalWattageGrid(grid1),
      subgrids: grid1.subgrids.map((subgrid) => ({
        ...subgrid.toObject(),
        totalWattage: calculateTotalWattage(subgrid),
      })),
    };
    GridDataToArduino= gridWithWattage;

    res.status(200).json(gridWithWattage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let previousProduction = Math.floor(Math.random() * 1600) + 1000; // Initialize with a random value

export const getProduction = async (req, res) => {
  try {
    // Generate a new production value within the range of 1000-2600
    const min = Math.max(1000, previousProduction - 300);
    const max = Math.min(2600, previousProduction + 300);
    const production = Math.floor(Math.random() * (max - min + 1)) + min;

    // Update the previous production value
    previousProduction = production;

    res.status(200).json({ production });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllGrid = async (req, res) => {
  try {
    const { timeRange } = req.query;
    let timeFilter = {};
    console.log("timeRange", timeRange);

    if (timeRange) {
      const now = new Date();
      let startTime;

      switch (timeRange) {
        case "1hr":
          startTime = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case "24hr":
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "1week":
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          return res.status(400).json({ error: "Invalid time range" });
      }

      timeFilter = { createdAt: { $gte: startTime } };
    }

    const grids = await Grid.find(timeFilter)
      .populate({
        path: "subgrids",
        populate: {
          path: "buildings",
          model: "Building",
        },
      })
      .exec();

    const gridsWithWattage = grids.map((grid) => ({
      ...grid.toObject(),
      subgrids: grid.subgrids.map((subgrid) => ({
        ...subgrid.toObject(),
        totalWattage: calculateTotalWattage(subgrid),
      })),
    }));
    res.status(200).json(gridsWithWattage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGrid = async (req, res) => {
  console.log("deleteGrid");
  try {
    const grid = await Grid.findById(req.params.gridId).populate("subgrids");
    if (!grid) return res.status(404).json({ error: "Grid not found" });

    for (const subgrid of grid.subgrids) {
      await Building.deleteMany({ _id: { $in: subgrid.buildings } });
      await Subgrid.findByIdAndDelete(subgrid._id);
    }

    await Grid.findByIdAndDelete(req.params.gridId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
