const powerSources = ['solar', 'wind', 'hydro', 'nuclear', 'coal'];

function generateDummyData(source) {
    const data = [];
    for (let i = 0; i < 24; i++) { // Generate data for 24 hours
        data.push({
            hour: i,
            production: Math.floor(Math.random() * 500) // Random production value between 0 and 1000
        });
    }
    return data;
}

function generatePowerProductionData() {
    const powerProductionData = {};
    powerSources.forEach(source => {
        powerProductionData[source] = generateDummyData(source);
    });
    return powerProductionData;
}


function getCurrentPowerProduction(powerProductionData) {
    const currentHour = new Date().getHours();
    const currentPower = {};

    for (const source in powerProductionData) {
        const hourlyData = powerProductionData[source];
        const currentHourData = hourlyData.find(data => data.hour === currentHour);
        currentPower[source] = currentHourData ? currentHourData.production : 0;
    }

    return currentPower;
}


export const powerProductionData = getCurrentPowerProduction(generatePowerProductionData());

// const currentPowerProduction = ;
// console.log('Current Power Production:', JSON.stringify(currentPowerProduction, null, 2));
// const powerProductionData = generatePowerProductionData();
// console.log(JSON.stringify(powerProductionData, null, 2));