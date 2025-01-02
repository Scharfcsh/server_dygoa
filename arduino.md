// Constants for device pins
const int room1Light1Pin = 2;
const int room1Fan1Pin = 3;
const int room2Light1Pin = 4;
const int room2Fan1Pin = 5;
const int room3Light1Pin = 6;
const int room3Fan1Pin = 7;

// DIP Switch pins (8 switches for multiple devices)
const int dipSwitchPins[] = {8, 9, 10, 11, A2,A3, A0, A1};
const int numSwitches = sizeof(dipSwitchPins) / sizeof(dipSwitchPins);

// Room data structure
struct Room {
  String name;
  int lightPin;
  int fanPin;
  bool lightState;
  bool fanState;
};

// Define rooms
Room rooms[] = {
  {"Room1", room1Light1Pin, room1Fan1Pin, false, false},
  {"Room2", room2Light1Pin, room2Fan1Pin, false, false},
  {"Room3", room3Light1Pin, room3Fan1Pin, false, false}
};
const int numRooms = sizeof(rooms) / sizeof(Room);

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Initialize device pins and states
  for (int i = 0; i < numRooms; i++) {
    pinMode(rooms[i].lightPin, OUTPUT);
    pinMode(rooms[i].fanPin, OUTPUT);
    digitalWrite(rooms[i].lightPin, LOW);
    digitalWrite(rooms[i].fanPin, LOW);
  }

  // Initialize DIP switch pins as inputs
  for (int i = 0; i < numSwitches; i++) {
    pinMode(dipSwitchPins[i], INPUT_PULLUP); // DIP switches use INPUT_PULLUP
  }

  Serial.println("Multi-Room Device Manager Ready with DIP Switch.");
}

void loop() {
  // Read DIP switch states and update devices
  for (int i = 0; i < numRooms; i++) {
    // Calculate DIP switch indices
    int lightSwitchIndex = i * 2;
    int fanSwitchIndex = lightSwitchIndex + 1; // fanSwitchIndex = lightSwitchIndex + 1

    // Read DIP switch states
    bool lightSwitchState = (digitalRead(dipSwitchPins[lightSwitchIndex]) == LOW); // LOW = ON
    bool fanSwitchState = (digitalRead(dipSwitchPins[fanSwitchIndex]) == LOW);    // LOW = ON

    // Update light and fan states only if necessary
    if (rooms[i].lightState != lightSwitchState || rooms[i].fanState != fanSwitchState) {
        if (rooms[i].lightState != lightSwitchState) {
            rooms[i].lightState = lightSwitchState;
            digitalWrite(rooms[i].lightPin, lightSwitchState ? HIGH : LOW);
        }

        if (rooms[i].fanState != fanSwitchState) {
            rooms[i].fanState = fanSwitchState;
            digitalWrite(rooms[i].fanPin, fanSwitchState ? HIGH : LOW);
        }
    }
}


  // Display updated room states every second
  delay(1000);
  Serial.println("Updated Room States:");
  Serial.print("[");
  for (int i = 0; i < numRooms; i++) {
    Serial.print("{ \"name\": \"");
    Serial.print(rooms[i].name);
    Serial.print("\", \"lightState\": ");
    Serial.print(rooms[i].lightState ? "true" : "false");
    Serial.print(", \"fanState\": ");
    Serial.print(rooms[i].fanState ? "true" : "false");
    Serial.print(" }");
    if (i < numRooms - 1) Serial.print(", ");
  }
  Serial.println("]");
}



---------------------------------------
json.diagram
{
  "version": 1,
  "author": "Anonymous maker",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-breadboard-half", "id": "bb1", "top": 73.8, "left": 300.4, "attrs": {} },
    { "type": "wokwi-breadboard-mini", "id": "bb2", "top": 325, "left": 285.6, "attrs": {} },
    { "type": "wokwi-breadboard-mini", "id": "bb3", "top": 469, "left": 285.6, "attrs": {} },
    { "type": "wokwi-arduino-uno", "id": "uno", "top": 307.8, "left": -58.2, "attrs": {} },
    {
      "type": "wokwi-resistor",
      "id": "r1",
      "top": 187.2,
      "left": 575.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-resistor",
      "id": "r2",
      "top": 187.2,
      "left": 383.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-resistor",
      "id": "r3",
      "top": 187.2,
      "left": 431.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-resistor",
      "id": "r4",
      "top": 187.2,
      "left": 479.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-resistor",
      "id": "r5",
      "top": 187.2,
      "left": 527.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-resistor",
      "id": "r6",
      "top": 187.2,
      "left": 335.45,
      "rotate": 90,
      "attrs": { "value": "220" }
    },
    {
      "type": "wokwi-led",
      "id": "led1",
      "top": 111.6,
      "left": 387.8,
      "attrs": { "color": "red" }
    },
    {
      "type": "wokwi-led",
      "id": "led2",
      "top": 111.6,
      "left": 579.8,
      "attrs": { "color": "red" }
    },
    {
      "type": "wokwi-led",
      "id": "led3",
      "top": 111.6,
      "left": 483.8,
      "attrs": { "color": "red" }
    },
    {
      "type": "wokwi-led",
      "id": "led4",
      "top": 111.6,
      "left": 531.8,
      "attrs": { "color": "green" }
    },
    {
      "type": "wokwi-led",
      "id": "led5",
      "top": 111.6,
      "left": 339.8,
      "attrs": { "color": "green" }
    },
    {
      "type": "wokwi-led",
      "id": "led6",
      "top": 111.6,
      "left": 435.8,
      "attrs": { "color": "green" }
    },
    { "type": "wokwi-dip-switch-8", "id": "sw1", "top": 428.7, "left": 327.9, "attrs": {} }
  ],
  "connections": [
    [ "uno:2", "bb1:30b.j", "green", [ "v-57.6", "h90.5" ] ],
    [ "uno:3", "bb1:25b.j", "green", [ "v-67.2", "h52" ] ],
    [ "uno:4", "bb1:20b.j", "green", [ "v0" ] ],
    [ "uno:5", "bb1:15b.j", "green", [ "v-67.2", "h-25" ] ],
    [ "uno:6", "bb1:10b.j", "green", [ "v-57.6", "h-63.5" ] ],
    [ "uno:7", "bb1:5b.j", "green", [ "v-48", "h-102" ] ],
    [ "uno:GND.1", "bb1:bn.1", "black", [ "v0" ] ],
    [ "bb1:bn.1", "bb1:tn.1", "green", [ "v0" ] ],
    [ "bb1:tn.3", "bb1:4t.a", "green", [ "v0" ] ],
    [ "bb1:tn.7", "bb1:9t.a", "green", [ "v28.7", "h1.6" ] ],
    [ "bb1:tn.11", "bb1:14t.a", "green", [ "v0" ] ],
    [ "bb1:tn.15", "bb1:19t.c", "green", [ "v0" ] ],
    [ "bb1:tn.20", "bb1:24t.c", "green", [ "v0" ] ],
    [ "bb1:tn.24", "bb1:29t.c", "green", [ "v0" ] ],
    [ "bb1:bn.25", "bb2:12b.j", "green", [ "v-10.9", "h164.8" ] ],
    [ "bb1:bn.24", "bb2:11b.j", "green", [ "v8.3", "h164.8" ] ],
    [ "bb1:bn.22", "bb2:9b.j", "green", [ "v27.5", "h164.8" ] ],
    [ "bb1:bn.21", "bb2:8b.j", "green", [ "v37.1", "h164.8" ] ],
    [ "bb1:bn.20", "bb2:7b.j", "green", [ "v46.7", "h174.4" ] ],
    [ "bb1:bn.19", "bb2:6b.j", "green", [ "v56.3", "h174.4" ] ],
    [ "bb1:bn.18", "bb2:5b.j", "green", [ "v65.9", "h174.4" ] ],
    [ "bb1:bn.23", "bb2:10b.j", "green", [ "v17.9", "h164.8" ] ],
    [ "uno:8", "bb3:5b.j", "green", [ "v0" ] ],
    [ "uno:9", "bb3:6b.i", "green", [ "v0" ] ],
    [ "uno:10", "bb3:7b.h", "green", [ "v0" ] ],
    [ "uno:11", "bb3:8b.g", "green", [ "v0" ] ],
    [ "uno:A0", "bb3:11t.d", "green", [ "v0" ] ],
    [ "uno:A1", "bb3:12t.c", "green", [ "v0" ] ],
    [ "bb3:5b.f", "bb3:5t.e", "green", [ "v0" ] ],
    [ "bb3:6b.f", "bb3:6t.e", "green", [ "v0" ] ],
    [ "bb3:7b.f", "bb3:7t.e", "green", [ "v0" ] ],
    [ "bb3:8t.e", "bb3:8b.f", "green", [ "v0" ] ],
    [ "sw1:8b", "bb2:12b.i", "", [ "$bb" ] ],
    [ "sw1:7b", "bb2:11b.i", "", [ "$bb" ] ],
    [ "sw1:6b", "bb2:10b.i", "", [ "$bb" ] ],
    [ "sw1:5b", "bb2:9b.i", "", [ "$bb" ] ],
    [ "sw1:4b", "bb2:8b.i", "", [ "$bb" ] ],
    [ "sw1:3b", "bb2:7b.i", "", [ "$bb" ] ],
    [ "sw1:2b", "bb2:6b.i", "", [ "$bb" ] ],
    [ "sw1:1b", "bb2:5b.i", "", [ "$bb" ] ],
    [ "sw1:1a", "bb3:5t.a", "", [ "$bb" ] ],
    [ "sw1:2a", "bb3:6t.a", "", [ "$bb" ] ],
    [ "sw1:3a", "bb3:7t.a", "", [ "$bb" ] ],
    [ "sw1:4a", "bb3:8t.a", "", [ "$bb" ] ],
    [ "sw1:5a", "bb3:9t.a", "", [ "$bb" ] ],
    [ "sw1:6a", "bb3:10t.a", "", [ "$bb" ] ],
    [ "sw1:7a", "bb3:11t.a", "", [ "$bb" ] ],
    [ "sw1:8a", "bb3:12t.a", "", [ "$bb" ] ],
    [ "uno:A2", "bb3:9t.e", "green", [ "v115.1", "h205.6" ] ],
    [ "uno:A3", "bb3:10t.e", "green", [ "v105.5", "h205.7" ] ],
    [ "r5:1", "bb1:25t.e", "", [ "$bb" ] ],
    [ "r5:2", "bb1:25b.i", "", [ "$bb" ] ],
    [ "r4:1", "bb1:20t.e", "", [ "$bb" ] ],
    [ "r4:2", "bb1:20b.i", "", [ "$bb" ] ],
    [ "r3:1", "bb1:15t.e", "", [ "$bb" ] ],
    [ "r3:2", "bb1:15b.i", "", [ "$bb" ] ],
    [ "r2:1", "bb1:10t.e", "", [ "$bb" ] ],
    [ "r2:2", "bb1:10b.i", "", [ "$bb" ] ],
    [ "r6:1", "bb1:5t.e", "", [ "$bb" ] ],
    [ "r6:2", "bb1:5b.i", "", [ "$bb" ] ],
    [ "led2:A", "bb1:30t.d", "", [ "$bb" ] ],
    [ "led2:C", "bb1:29t.d", "", [ "$bb" ] ],
    [ "led1:A", "bb1:10t.d", "", [ "$bb" ] ],
    [ "led1:C", "bb1:9t.d", "", [ "$bb" ] ],
    [ "led5:A", "bb1:5t.d", "", [ "$bb" ] ],
    [ "led5:C", "bb1:4t.d", "", [ "$bb" ] ],
    [ "led4:A", "bb1:25t.d", "", [ "$bb" ] ],
    [ "led4:C", "bb1:24t.d", "", [ "$bb" ] ],
    [ "led3:A", "bb1:20t.d", "", [ "$bb" ] ],
    [ "led3:C", "bb1:19t.d", "", [ "$bb" ] ],
    [ "led6:A", "bb1:15t.d", "", [ "$bb" ] ],
    [ "led6:C", "bb1:14t.d", "", [ "$bb" ] ],
    [ "r1:1", "bb1:30t.e", "", [ "$bb" ] ],
    [ "r1:2", "bb1:30b.i", "", [ "$bb" ] ]
  ],
  "dependencies": {}
}