import {powerProductionData} from '../scripts/setEnergyproduction.js';

export const TotalEnergyProduction = (req,res)=>{
    const data = powerProductionData;
    if(!data){
        res.status(404).json({error: 'Data not found'});
    }   

    res.status(200).json(data);
}