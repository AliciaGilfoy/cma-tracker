import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Challenge = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    point: { type: Number, required: true },
    weekly: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Challenge;