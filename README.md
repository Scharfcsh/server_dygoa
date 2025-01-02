Here's the updated endpoint structure, including **wattage** for rooms and devices. The total energy demand dynamically adjusts based on the state of the devices when toggled.

---

### **1. Room Management**
#### **Get All Rooms**
- **Method:** `GET`
- **Route:** `/api/rooms`
- **Response:**
```json
[
  {
    "id": "living-room",
    "name": "Living Room",
    "lightsOn": 3,
    "totalLights": 5,
    "totalWattage": 120,
    "energyUsage": 72
  },
  {
    "id": "bedroom",
    "name": "Bedroom",
    "lightsOn": 1,
    "totalLights": 2,
    "totalWattage": 60,
    "energyUsage": 30
  }
]
```

---

#### **Get Room Details**
- **Method:** `GET`
- **Route:** `/api/rooms/:roomId`
- **Response:**
```json
{
  "id": "living-room",
  "name": "Living Room",
  "lightsOn": 3,
  "totalLights": 5,
  "totalWattage": 120,
  "energyUsage": 72,
  "devices": [
    {
      "id": "light-1",
      "type": "light",
      "status": "on",
      "wattage": 20
    },
    {
      "id": "light-2",
      "type": "light",
      "status": "off",
      "wattage": 20
    },
    {
      "id": "fan-1",
      "type": "fan",
      "status": "on",
      "wattage": 60
    }
  ]
}
```

---

#### **Update Room State**
- **Method:** `POST`
- **Route:** `/api/rooms/:roomId/update`
- **Request:**
```json
{
  "lightsOn": 4,
  "totalLights": 5
}
```
- **Response:**
```json
{
  "message": "Room updated successfully",
  "updatedRoom": {
    "id": "living-room",
    "lightsOn": 4,
    "totalLights": 5,
    "totalWattage": 140,
    "energyUsage": 93
  }
}
```

---

### **2. Device Management**
#### **Get All Devices in a Room**
- **Method:** `GET`
- **Route:** `/api/rooms/:roomId/devices`
- **Response:**
```json
[
  {
    "id": "light-1",
    "type": "light",
    "status": "on",
    "wattage": 20
  },
  {
    "id": "light-2",
    "type": "light",
    "status": "off",
    "wattage": 20
  },
  {
    "id": "fan-1",
    "type": "fan",
    "status": "on",
    "wattage": 60
  }
]
```

---

#### **Update Device State**
- **Method:** `POST`
- **Route:** `/api/rooms/:roomId/devices/:deviceId/update`
- **Request:**
```json
{
  "status": "off"
}
```
- **Response:**
```json
{
  "message": "Device updated successfully",
  "updatedDevice": {
    "id": "light-1",
    "type": "light",
    "status": "off",
    "wattage": 20
  },
  "updatedRoom": {
    "id": "living-room",
    "lightsOn": 2,
    "totalWattage": 100,
    "energyUsage": 60
  },
  "totalEnergyDemand": 90
}
```

---

### **3. Energy Analytics**
#### **Get Total Energy Demand**
- **Method:** `GET`
- **Route:** `/api/energy/demand`
- **Response:**
```json
{
  "totalEnergyUsage": 150,
  "rooms": [
    {
      "id": "living-room",
      "energyUsage": 72
    },
    {
      "id": "bedroom",
      "energyUsage": 30
    },
    {
      "id": "kitchen",
      "energyUsage": 48
    }
  ]
}
```

---

#### **Predict Future Energy Usage** (Integration with Python Logic)
- **Method:** `POST`
- **Route:** `/api/energy/predict`
- **Request:**
```json
{
  "lightsOn": 10,
  "totalLights": 15,
  "averageUsageHours": 5,
  "deviceWattage": [20, 40, 60]
}
```
- **Response:**
```json
{
  "predictedUsage": 600,
  "unit": "kWh"
}
```

---

### **4. Hardware Integration**
#### **Sync Room State**
- **Method:** `GET`
- **Route:** `/api/hardware/sync/:roomId`
- **Response:**
```json
{
  "id": "living-room",
  "lightsOn": 4,
  "totalLights": 5,
  "totalWattage": 140,
  "energyUsage": 93,
  "devices": [
    {
      "id": "light-1",
      "type": "light",
      "status": "on",
      "wattage": 20
    },
    {
      "id": "light-2",
      "type": "light",
      "status": "off",
      "wattage": 20
    },
    {
      "id": "fan-1",
      "type": "fan",
      "status": "on",
      "wattage": 60
    }
  ],
  "totalEnergyDemand": 150
}
```

---

### **Dynamic Energy Demand Update**
The `totalEnergyDemand` field is dynamically updated on every request that changes device or room state. It reflects the total wattage used across all active devices in real-time.

This structure aligns with the requirement that toggling switches (on/off) directly impacts the total energy demand. Let me know if further tweaks are needed!


If the energy production is **300 kW** but the building requires **350 kW** to power all devices, the system will face an energy **shortfall** of **50 kW**. This discrepancy will lead to one or more of the following outcomes, depending on how the system is designed to handle such situations:

---

### **1. Overloading the Energy Sources**
- If the system tries to draw the full **350 kW** demand despite only producing **300 kW**, it may overload the energy sources.
- Consequences:
  - Equipment failure or damage in the generation system (e.g., overheating or tripping of generators).
  - Instability or failure of the energy grid (voltage drops, blackouts).

---

### **2. Load Shedding (Selective Device Shutdown)**
- To prevent system damage, **load shedding** may occur. This involves turning off or disconnecting certain devices or parts of the building to reduce total demand to match the available supply (300 kW).
- Consequences:
  - Some areas or devices in the building will lose power.
  - Prioritized or critical loads (e.g., lights, servers, essential equipment) may remain on, while non-essential devices (e.g., decorative lighting, charging stations) are turned off.

---

### **3. Voltage Drops and System Instability**
- If the system attempts to meet demand despite the shortfall, the building's power supply may experience a voltage drop.
- Consequences:
  - Devices may malfunction, operate inefficiently, or become damaged.
  - Sensitive equipment (e.g., computers, medical devices) could fail or be affected.

---

### **4. Battery Backup or Energy Storage**
- If the system includes a battery or other energy storage system, the shortfall (50 kW) may be temporarily met using stored energy.
- Consequences:
  - Devices continue operating normally for a limited time.
  - The battery or storage system will deplete, and load shedding or system instability will occur if production remains insufficient.

---

### **5. Automated Demand Response**
- Modern energy management systems may include automated controls to adjust device usage dynamically.
- Consequences:
  - Power-hungry devices (e.g., HVAC systems) may be throttled or cycled on and off to balance demand.
  - Energy-efficient modes may be activated to reduce consumption without fully shutting down devices.

---

### **Mitigation Strategies:**
1. **Increase Power Supply:**
   - Ramp up additional energy sources or use energy storage to meet demand.
2. **Reduce Demand:**
   - Turn off non-essential devices or optimize energy use in the building.
3. **Implement Smart Load Management:**
   - Use systems that prioritize critical loads and manage non-critical loads automatically.

If no measures are taken to address the shortfall, the mismatch between supply and demand will likely result in partial or complete system failure.