import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Student = new Schema(
  {
    name: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    date: [{ type: String }],
    profileEmail: { type: String, required: true },
    challengeId: [{ type: ObjectId, ref: "Challenge" }],
    challengeName: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Student.virtual("creator", {
//   localField: "creatorEmail",
//   ref: "Profile",
//   foreignField: "email",
//   justOne: true
// });

export default Student;
