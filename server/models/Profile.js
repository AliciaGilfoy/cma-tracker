import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    admin: { type: Boolean, default: false },
    instructor: { type: Boolean, default: false }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Profile;
