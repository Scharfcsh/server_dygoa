import Grid from "../models/Grid.js";

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

const gridId = "67785a7ebae3aae905565775";

export const analyseGrid = async (production) => {
  console.log("=================================================");
  console.log("Analyzing grid");
  console.log("=================================================");
  const grid = await Grid.findById(gridId)
    .populate({
      path: "subgrids",
      populate: {
        path: "buildings",
        model: "Building",
      },
    })
    .exec();

  var totalDemand = calculateTotalWattageGrid(grid);

  // Flatten the array of buildings from all subgrids
  var buildings = grid.subgrids.flatMap((subgrid) => subgrid.buildings);

  // Sort buildings by priority
  buildings.sort((a, b) => a.priority - b.priority);

  // console.log(buildings);
  console.log("=================================================");

  while (totalDemand > production) {
    const building = buildings.pop();
    if (!building) {
      // console.log("No more buildings to turn off");
      break;
    }

    console.log(`Turning off ${building.name}`);
    building.status = false;
    totalDemand -= building.wattage;
    building.save();
  }

  // Sort buildings by priority in descending order for turning on
  for (const building of buildings) {
    if (totalDemand + building.wattage <= production && !building.status) {
      console.log(`Turning on ${building.name}`);
      building.status = true;
      totalDemand += building.wattage; // Adjust total demand
      building.save();
    }
  }

  console.log("=================================================");
  console.log("Grid analysis completed");
  console.log("=================================================");

  await grid.save();
  // console.log(buildings);
  console.log("=================================================");
  const parsedGrid = grid.subgrids.flatMap((subgrid) => subgrid.buildings);
  const status= parsedGrid.map(item => item.status ? '1' : '0').join('');
  return status;
};


