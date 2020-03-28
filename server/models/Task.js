import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Task = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    point: { type: Number, required: true },
    link: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Task;