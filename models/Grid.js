import mongoose from "mongoose";

const GridSchema = new mongoose.Schema(
  {
    name: String,
    subgrids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subgrid" }],
  },
  { timestamps: true }
);

const Grid = mongoose.model("Grid", GridSchema);

export default Grid;