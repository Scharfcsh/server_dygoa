const grid ={
    "name": "Grid 1",
    "subgrids": [
        {
            "name": "Subgrid 1",
            "buildings": [
                {
                    "wattage": 525,
                    "status": true,
                    "priority": 1,
                    "name": "Hospital",
                    "_id": "67783ab8460213429e5d03a0",
                    "createdAt": "2025-01-03T19:30:00.614Z",
                    "updatedAt": "2025-01-03T19:30:00.614Z",
                    "__v": 0
                },
                {
                    "wattage": 989,
                    "status": true,
                    "priority": 3,
                    "name": "Residential",
                    "_id": "67783ab9460213429e5d03a2",
                    "createdAt": "2025-01-03T19:30:01.245Z",
                    "updatedAt": "2025-01-03T19:30:01.245Z",
                    "__v": 0
                }
            ],
            "_id": "67783ab9460213429e5d03a4",
            "createdAt": "2025-01-03T19:30:01.289Z",
            "updatedAt": "2025-01-03T19:30:01.289Z",
            "__v": 0,
            "totalWattage": 1514
        },
        {
            "name": "Subgrid 2",
            "buildings": [
                {
                    "wattage": 754,
                    "status": true,
                    "priority": 1,
                    "name": "Server Room",
                    "_id": "67783ab9460213429e5d03a6",
                    "createdAt": "2025-01-03T19:30:01.322Z",
                    "updatedAt": "2025-01-03T19:30:01.322Z",
                    "__v": 0
                },
                {
                    "wattage": 681,
                    "status": true,
                    "priority": 2,
                    "name": "Hotel",
                    "_id": "67783ab9460213429e5d03a8",
                    "createdAt": "2025-01-03T19:30:01.367Z",
                    "updatedAt": "2025-01-03T19:30:01.367Z",
                    "__v": 0
                }
            ],
            "_id": "67783ab9460213429e5d03aa",
            "createdAt": "2025-01-03T19:30:01.399Z",
            "updatedAt": "2025-01-03T19:30:01.399Z",
            "__v": 0,
            "totalWattage": 1435
        },
        {
            "name": "Subgrid 3",
            "buildings": [
                {
                    "wattage": 259,
                    "status": true,
                    "priority": 1,
                    "name": "Server Room",
                    "_id": "67783ab9460213429e5d03ac",
                    "createdAt": "2025-01-03T19:30:01.430Z",
                    "updatedAt": "2025-01-03T19:30:01.430Z",
                    "__v": 0
                },
                {
                    "wattage": 228,
                    "status": true,
                    "priority": 2,
                    "name": "Hotel",
                    "_id": "67783ab9460213429e5d03ae",
                    "createdAt": "2025-01-03T19:30:01.466Z",
                    "updatedAt": "2025-01-03T19:30:01.466Z",
                    "__v": 0
                }
            ],
            "_id": "67783ab9460213429e5d03b0",
            "createdAt": "2025-01-03T19:30:01.496Z",
            "updatedAt": "2025-01-03T19:30:01.496Z",
            "__v": 0,
            "totalWattage": 487
        }
    ],
    "_id": "67783ab9460213429e5d03b2",
    "createdAt": "2025-01-03T19:30:01.524Z",
    "updatedAt": "2025-01-03T19:30:01.524Z",
    "__v": 0,
    "totalWattage": 3436
}


export function getBuildingDetails(grid) {
    const buildings = [];
    if (grid && grid.subgrids) {
        grid.subgrids.forEach(subgrid => {
            subgrid.buildings.forEach(building => {
                buildings.push({
                    id: building._id,
                    priority: building.priority,
                    wattage: building.wattage,
                    status: building.status
                });
            });
        });
    }
    return buildings;
}

export const buildingDetails = getBuildingDetails(grid);
console.log(buildingDetails);