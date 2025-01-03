import express from "express";
import { getGrid } from "../controllers/gridController.js";

const GridRouter = express.Router();

GridRouter.get("/details", getGrid);

// GridRouter.post("/api/grids/:gridId/update", updateGridState);
// GridRouter.get("/:gridId/subgrids", getGridSubgrids);
// GridRouter.post("/api/grids/:gridId/subgrids/:subgridId/update", updateSubgridState);

export default GridRouter;
