import express from 'express';
import { TotalEnergyProduction } from '../controllers/getTotalPowerGeneration.js';
import { TotalEnergyDemand } from '../controllers/getTotalEnergyDemand.js';

const EnergyRouter = express.Router();  



EnergyRouter.get("/demand", TotalEnergyDemand); //done
EnergyRouter.get("/production", TotalEnergyProduction); //done

export default EnergyRouter;