import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Redeamed = new Schema(
  {
    studentName: { type: String, required: true },
    prizeName: { type: String, required: true },
    profileEmail: { type: String, required: true },
    date: { type: String, required: true },
    instructorId: { type: ObjectId, ref: "Profile", required: true },
    complete: { type: Boolean, default: false },
    completedBy: { type: String, lowercase: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Redeamed;