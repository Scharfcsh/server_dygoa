import mongoose from "mongoose";

const SubgridSchema = new mongoose.Schema(
  {
    name: String,
    buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Building" }],
  },
  { timestamps: true }
);

const Subgrid = mongoose.model("Subgrid", SubgridSchema);

export default Subgrid;
