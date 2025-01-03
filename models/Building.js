import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema(
  {
    wattage: Number,
    status: Boolean,
    priority: {
      type: Number,
      min: 0,
      max: 3,
    },
    name: String,
  },
  { timestamps: true }
);
const Building = mongoose.model("Building", BuildingSchema);
export default Building;
