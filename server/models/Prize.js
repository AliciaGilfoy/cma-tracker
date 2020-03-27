import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Prize = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    type: { type: String, required: true },
    instructorName: { type: String },
    instructorId: { type: ObjectId, ref: "Profile" },
    picUrl: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Prize;