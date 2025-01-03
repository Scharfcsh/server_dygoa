import express from "express";
import {
  getGrid,
  getProduction,
  getAllGrid,
  deleteGrid,
} from "../controllers/gridController.js";

const GridRouter = express.Router();

GridRouter.get("/details", getGrid);
GridRouter.get("/production", getProduction);
GridRouter.get("/all/time", getAllGrid);
GridRouter.delete("/delete/:gridId", deleteGrid);

// GridRouter.post("/api/grids/:gridId/update", updateGridState);
// GridRouter.get("/:gridId/subgrids", getGridSubgrids);
// GridRouter.post("/api/grids/:gridId/subgrids/:subgridId/update", updateSubgridState);

export default GridRouter;
