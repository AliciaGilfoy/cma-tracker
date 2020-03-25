import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Student = new Schema(
  {
    name: { type: String, required: true, unique: true },
    key: { type: String, required: true },
    points: { type: Number, default: 0 },
    dates: [{ type: String }]
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
